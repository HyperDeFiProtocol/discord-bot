const {Translate} = require('@google-cloud/translate').v2;
const config = require('../utils/config');

const googleProjectId = config['googleCloud']['projectId']
const googleTranslate = new Translate({projectId: googleProjectId});

async function translate(text, targetLang) {
    const languages = config['translateLanguages']
    if (!languages) return null;

    if (languages.hasOwnProperty(targetLang)) {
        targetLang = languages[targetLang]
    }

    let exist = false
    for (const key in languages) {
        if (targetLang === languages[key]) exist = true
    }

    if (!exist) return null;

    const [translation] = await googleTranslate.translate(text, targetLang).catch(console.error);

    return translation
}

module.exports = translate
