// const database = require('../database/user.json')
const fs = require('fs')

const saveUserData = (req,res) => {
    const {name, companyName, jobPosition, phoneNumber, explanation} = req.body
    const filePath = './database/user.json'
    const userData = {
        name,
        companyName,
        jobPosition,
        phoneNumber,
        explanation
    }


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
    
    res.send(dataArrString)
}

module.exports = {saveUserData}