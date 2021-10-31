async function importFranc() {
    const franc = await import('franc')
    return franc.franc
}

async function importFrancAll() {
    const franc = await import('franc')
    return franc.francAll
}

const wait = function (timeout = 1000) {
    return new Promise((resolve, reject) => {
        if (timeout > 0) {
            setTimeout(() => {
                resolve(timeout)
            }, timeout)
        } else {
            reject('Invalid `timeout`')
        }
    })
}

const titleCase = function (text) {
    return text.slice(0, 1).toUpperCase() + text.slice(1)
}


module.exports = {
    importFranc: importFranc,
    importFrancAll: importFrancAll,

    wait: wait,
    titleCase: titleCase,
}
