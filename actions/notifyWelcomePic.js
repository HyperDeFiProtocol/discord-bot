const os = require('os');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const textToSvg = require('text-to-svg');
const moment = require('moment');
const crypto = require('crypto');
const {config, debug, notifyChannels} = require('../utils/bot')


const md5 = function (text) {
    return crypto.createHash('md5').update(text).digest('hex')
}

const getUserAvatarBuffer = async function (user, radius) {
    const roundedCorners = Buffer.from(
        `<svg><rect x="0" y="0" width="${radius}" height="${radius}" rx="${radius}" ry="${radius}"/></svg>`
    );


    const input = (await axios({url: user.displayAvatarURL(), responseType: "arraybuffer"})).data;

    const pipeline = sharp(input).resize(radius, radius)
    return await pipeline
        .composite([{
            input: roundedCorners,
            blend: 'dest-in'
        }])
        .toBuffer()
}

module.exports = async function (user) {
    if (debug) return;

    const welcomeChannel = notifyChannels['welcomePic']
    if (!welcomeChannel) return;

    const welcomeLayers = config['welcomeLayers']
    if (!welcomeLayers) return;
    if (!welcomeLayers['base']) return;

    let sharpLayers = []
    if (welcomeLayers['avatar']) {
        const avatar = await getUserAvatarBuffer(user, welcomeLayers['avatar']['radius'] || 128)
        sharpLayers.push({
            input: avatar,
            left: welcomeLayers['avatar']['x'] || 543,
            top: welcomeLayers['avatar']['y'] || 40,
        })
    }

    // layer: user tag
    const layerUserTag = welcomeLayers['userTag']
    if (layerUserTag && layerUserTag['font']) {
        const svg = textToSvg
            .loadSync(path.join(__dirname, `../assets/fonts/${layerUserTag['font']}`))
            .getSVG(
                user.tag,
                {
                    x: 0,
                    y: 0,
                    fontSize: layerUserTag['fontSize'] || 39,
                    anchor: 'top',
                    attributes: {fill: layerUserTag['color'] || '#E4E4E7'}
                }
            )

        sharpLayers.push({
            input: Buffer.from(svg),
            left: layerUserTag['x'] || 64,
            top: layerUserTag['y'] || 198,
        })
    }

    // layer: user id
    const layerUserId = welcomeLayers['userId']
    if (layerUserId && layerUserId['font']) {
        const svg = textToSvg
            .loadSync(path.join(__dirname, `../assets/fonts/${layerUserId['font']}`))
            .getSVG(
                `UserID: ${user.id}`,
                {
                    x: 0,
                    y: 0,
                    fontSize: layerUserId['fontSize'] || 19,
                    anchor: 'top',
                    attributes: {fill: layerUserId['color'] || '#A1A1AA'}
                }
            )

        sharpLayers.push({
            input: Buffer.from(svg),
            left: layerUserId['x'] || 64,
            top: layerUserId['y'] || 376,
        })
    }

    // layer: timestamp
    const layerTimestamp = welcomeLayers['timestamp']
    if (layerTimestamp && layerTimestamp['font']) {
        const svg = textToSvg
            .loadSync(path.join(__dirname, `../assets/fonts/${layerTimestamp['font']}`))
            .getSVG(
                moment().format(),
                {
                    x: 0,
                    y: 0,
                    fontSize: layerTimestamp['fontSize'] || 19,
                    anchor: 'top',
                    attributes: {fill: layerTimestamp['color'] || '#A1A1AA'}
                }
            )

        sharpLayers.push({
            input: Buffer.from(svg),
            left: layerTimestamp['x'] || 453,
            top: layerTimestamp['y'] || 376,
        })
    }

    if (!sharpLayers) return;

    // composite layers
    const pipeline = sharp(path.join(__dirname, `../assets/images/${welcomeLayers['base']}`))
    await pipeline.composite(sharpLayers)

    // output
    const outputFile = path.join(os.tmpdir(), `${md5(user.id)}.jpg`)
    await pipeline.toFile(outputFile)

    // send
    await welcomeChannel.send({files: [outputFile]})

    // clear
    fs.unlinkSync(outputFile)
}
