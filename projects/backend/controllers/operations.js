// const database = require('../database/user.json')
const fs = require('fs').promises

async function writeToFile(userData){
    const filePath = './database/user.json'
    let databaseArray = []
    try {
        const stringDatabase = await fs.readFile(filePath,'utf-8')
        if(stringDatabase){
            databaseArray = JSON.parse(stringDatabase)
        } 
    } catch (err) {
        console.log(`file doesn't exist!`)
    }
    
    databaseArray.push(userData)
    const dataArrString = JSON.stringify(databaseArray)

    try {
        await fs.writeFile(filePath,dataArrString)
        console.log('file successfully written!')
    } catch (err) {
        console.log(err)
    }
    
    return dataArrString
}
const saveUserData = async(req,res) => {
    const {name, companyName, jobPosition, phoneNumber, explanation} = req.body
    
    const userData = {
        name,
        companyName,
        jobPosition,
        phoneNumber,
        explanation
    }
    const dataArrString = await writeToFile(userData)
    res.send(dataArrString)
}

module.exports = {saveUserData}