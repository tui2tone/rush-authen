require('dotenv').config()
const {
    GoogleSpreadsheet
} = require('google-spreadsheet');
const fs = require('fs')

const start = async () => {

    const doc = new GoogleSpreadsheet(process.env.SHEET_I18N);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

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
