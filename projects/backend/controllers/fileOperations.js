const fs = require('fs').promises;


async function readFromFile(filePath){
    let databaseArray = []
    try {
        const stringDatabase = await fs.readFile(filePath,'utf-8')
        if(stringDatabase){
            databaseArray = JSON.parse(stringDatabase)
        } 
    } catch (err) {
        console.log(`File doesn't exist!`)
    }
    return databaseArray
}


async function writeToFile(userData, filePath) {
    let databaseArray = await readFromFile(filePath);

    databaseArray.push(userData);
    const dataArrString = JSON.stringify(databaseArray, null, 2);

    try {
        await fs.writeFile(filePath, dataArrString);
        console.log('File successfully written!');
    } catch (err) {
        console.log(`Error writing to file: ${err.message}`);
    }
    return dataArrString;
}


module.exports = {
    readFromFile,
    writeToFile,
};
