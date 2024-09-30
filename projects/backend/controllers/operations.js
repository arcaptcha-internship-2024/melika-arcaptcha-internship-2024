// const database = require('../database/user.json')
const fs = require('fs').promises
const axios = require('axios');

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
    //adding null and 2 makes the json file more readable
    const dataArrString = JSON.stringify(databaseArray,null,2)

    try {
        await fs.writeFile(filePath,dataArrString)
        console.log('file successfully written!')
    } catch (err) {
        console.log(err)
    }
    
    return dataArrString
}
const saveUserData = async(req,res) => {
    // console.log("Request Body:", req.body);
    const {name, companyName, jobPosition, phoneNumber, explanation,'arcaptcha-token':arcaptcha_token} = req.body
    const arcaptcha_api = "https://api.arcaptcha.co/arcaptcha/api/verify";
    const result = await axios.post(arcaptcha_api, {
        challenge_id: arcaptcha_token,
        site_key: "qh7aotm3n8",
        secret_key: "2orcx4w6tdv91a8uuzdj",
      });

    //   console.log(result.data)
      if (result.data.success) {
        const userData = {
            name,
            companyName,
            jobPosition,
            phoneNumber,
            explanation
        }
        const dataArrString = await writeToFile(userData)
        res.send({success: true, message: 'Your form successfully submited!'})
      } else {
        res.send({success: false, message:'Verify You Are Human'})
        console.log('form submission failed')
      }
    
    
}

module.exports = {saveUserData}