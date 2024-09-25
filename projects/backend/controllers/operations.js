// const database = require('../database/user.json')
const fs = require('fs')

function writeToFile(userData){
    const filePath = './database/user.json'
    let databaseArray = []
    const stringDatabase = fs.readFileSync(filePath,'utf-8')
    if(stringDatabase){
        databaseArray = JSON.parse(stringDatabase)
    }
    databaseArray.push(userData)

    const dataArrString = JSON.stringify(databaseArray)
    fs.writeFile(filePath,dataArrString,err=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('file successfully written!')
        }
    })
    return dataArrString
}
const saveUserData = (req,res) => {
    const {name, companyName, jobPosition, phoneNumber, explanation} = req.body
    
    const userData = {
        name,
        companyName,
        jobPosition,
        phoneNumber,
        explanation
    }
    const dataArrString = writeToFile(userData)
    res.send(dataArrString)
}

module.exports = {saveUserData}