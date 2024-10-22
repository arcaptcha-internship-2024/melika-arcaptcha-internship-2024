// const database = require('../database/user.json')
const fs = require('fs').promises
const axios = require('axios');

async function writeToFile(userData, filePath){
    let databaseArray = []
    databaseArray = await readFromFile(filePath)

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


async function verifyArcaptcha(arcaptcha_token){
    const arcaptcha_api = "https://api.arcaptcha.co/arcaptcha/api/verify";
    const result = await axios.post(arcaptcha_api, {
        challenge_id: arcaptcha_token,
        site_key: "qh7aotm3n8",
        secret_key: "2orcx4w6tdv91a8uuzdj",
    });
    return result.data.success
}


async function readFromFile(filePath){
    let databaseArray = []
    try {
        const stringDatabase = await fs.readFile(filePath,'utf-8')
        if(stringDatabase){
            databaseArray = JSON.parse(stringDatabase)
        } 
    } catch (err) {
        console.log(`file doesn't exist!`)
    }
    return databaseArray
}


async function verifyUser(userData) {
    const filePath = userData.role === 'admin' ? './database/admins.json' : './database/salesManagers.json'
    const databaseArray = await readFromFile(filePath)
    let result = {success: false, message: `There is no ${userData.role} with your username`}

    for(const user of databaseArray){
        if(user.email === userData.email){
            if(user.password === userData.password){
                result.success = true
                result.message = `Welcome Here!!`
            }
            else{
                result.message = `Incorrect password`
            }
        }
    }
    return result
}


const saveUserData = async(req,res) => {
    const {name, companyName, jobPosition, phoneNumber, explanation,'arcaptcha-token':arcaptcha_token} = req.body
    const isArcaptchaValid = await verifyArcaptcha(arcaptcha_token)
    const filePath = './database/user.json'
    if (isArcaptchaValid) {
        const userData = {
            name,
            companyName,
            jobPosition,
            phoneNumber,
            explanation
        }
        const dataArrString = await writeToFile(userData,filePath)
        res.send({success: true, message: 'Your form successfully submited!'})
    } else {
        res.send({success: false, message:'Verify You Are Human'})
        console.log('form submission failed')
    }
}


const login = async (fastify, req, res) => {
    const {email, password,'arcaptcha-token':arcaptcha_token, role } = req.body
    const isArcaptchaValid = await verifyArcaptcha(arcaptcha_token)
    if(isArcaptchaValid){
        const userData = {
            email,
            password,
            role
        }
        const result = await verifyUser(userData)
        if(result.success){
            const token = fastify.jwt.sign({email: email, role: role}, { expiresIn: '1h' });
            res.send({
                success: true,
                message: result.message,
                jwtToken: token
            })
        }
        else{
            res.send(result)
        }
    }else{
        res.send({success: false, message:'Verify You are a Human!'})
    }
}


const registerUser = async (fastify, req, res) => {
    const {email, password,'arcaptcha-token':arcaptcha_token, role } = req.body
    const isArcaptchaValid = await verifyArcaptcha(arcaptcha_token)
    if(isArcaptchaValid){
        const userData = {
            email,
            password
        }
        const path = role === 'admin' ? './database/admins.json' : './database/salesManagers.json'
        const dataArrString = await writeToFile(userData,path)
        res.send({success: true, message: 'User successfully registered!'})
        
    }else{
        res.send({success: false, message:'Verify You are a Human!'})
    }
}

const getSalesManagers = async(req,res) => {
    const salesManagers = await readFromFile('./database/salesManagers.json')
    res.send(salesManagers)
}
module.exports = {saveUserData,login, registerUser, getSalesManagers}