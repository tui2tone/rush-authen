const glob = require('glob')
const fs = require('fs').promises;
const writeJsonFile = require('write-json-file');

const start = async() => {
    const files = await getFiles()

    await setupPackageJsonConfig(files)
    await setupTsConfig(files)
}

const setupPackageJsonConfig = async(files) => {
    const packageJson = await fs.readFile('package.json', 'utf8');
    let data = JSON.parse(packageJson)
    let moduleAlias = {}
    for (let file of files) {
        const fileStat = await fs.lstat(file);
        if (fileStat.isDirectory()) {
            const path = file.replace('src/', '')
            moduleAlias[`@${path}`] = `dist/${path}`
        }
    }
    data._moduleAliases = {
        ...moduleAlias
    }
    await writeJsonFile('./package.json', data);
}


const setupTsConfig = async(files) => {
    const packageJson = await fs.readFile('tsconfig.json', 'utf8');
    let data = JSON.parse(packageJson)
    let moduleAlias = {}
    for (let file of files) {
        const fileStat = await fs.lstat(file);
        if (fileStat.isDirectory()) {
            const path = file.replace('src/', '')
            moduleAlias[`@${path}/*`] = [`src/${path}/*`]
        }
    }
    data.compilerOptions.paths = {
        ...moduleAlias
    }
    await writeJsonFile('./tsconfig.json', data);
}


const getFiles = () => {
    return new Promise((resolve, reject) => {
        glob("src/*", {}, (err, files) => {
            if (err) {
                return reject(err)
            }
            return resolve(files)
        })
    })
}

start()