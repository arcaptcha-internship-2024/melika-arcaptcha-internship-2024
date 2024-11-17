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

const downloadUsers = async (request,reply) => {
    const fs = require('fs');
    try {
        const filePath = request.headers['x-file-path']

        if (fs.existsSync(filePath)) {
            reply.header('Content-Disposition', 'attachment; filename="customers.json"');
            reply.header('Content-Type', 'application/json');
            return reply.send(fs.createReadStream(filePath));
        } else {
            reply.code(404).send({ error: 'File not found' });
        }
    } catch (error) {
        request.log.error(error);
        reply.code(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    readFromFile,
    writeToFile,
    downloadUsers
};
