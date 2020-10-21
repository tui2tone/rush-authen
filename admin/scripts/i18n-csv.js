require('dotenv').config()
const fs = require('fs')

const start = async () => {

    if (rows && rows.length) {
        const baseObject = rows[0]
        const availableLanguage = Object.keys(baseObject).map(m => m.toLowerCase()).filter(m => !['key', '_sheet', '_rownumber', '_rawdata'].includes(m))

        for (let i = 0; i < availableLanguage.length; i++) {
            const lang = availableLanguage[i]
            const langObj = {}

            rows.map((item) => {
                langObj[item['KEY']] = item[lang.toUpperCase()]
            })

            // fs.writeFileSync(__dirname + '/../src/assets/i18n/' + lang + '.json', JSON.stringify(langObj))
        }
    }

}

start()
