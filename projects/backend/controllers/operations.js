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

function getTime(){
    let date_time = new Date();
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    let hours = date_time.getHours();
    let minutes = date_time.getMinutes();
    let seconds = date_time.getSeconds();
    const result = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    return result
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
    const { v4: uuidv4 } = require('uuid'); 
    const {name, companyName, jobPosition, phoneNumber, explanation,'arcaptcha-token':arcaptcha_token} = req.body
    const isArcaptchaValid = await verifyArcaptcha(arcaptcha_token)
    const filePath = './database/user.json'
    const uniqueId = uuidv4()
    const createdDate = getTime()
    if (isArcaptchaValid) {
        const userData = {
            id: uniqueId,
            name,
            companyName,
            jobPosition,
            phoneNumber,
            explanation,
            createdDate: createdDate,
            lastUpdate: createdDate,
            status: 'Pending',
            supervisorExplanation: ''
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

const getUsers = async(path,req,res) => {
    const users = await readFromFile(path)
    res.send(users)
}

const updateUser = async(req,res) => {
    const id = req.body.id
    const {name, companyName, jobPosition, phoneNumber, explanation,'arcaptcha-token':arcaptcha_token} = req.body
    let databaseArray = []
    const filePath = './database/user.json'
    const isArcaptchaValid = await verifyArcaptcha(arcaptcha_token)
    if(isArcaptchaValid){
        databaseArray = await readFromFile(filePath)
        updatedDatabaseArray = databaseArray.map(user => {
            if(user.id === id){
                return{...user, name:name, companyName,companyName, jobPosition,jobPosition,phoneNumber,phoneNumber,explanation:explanation}
            }else{
                return user
            }
        })
        const dataArrString = JSON.stringify(updatedDatabaseArray,null,2)
        try {
            await fs.writeFile(filePath,dataArrString)
            console.log('file successfully written!')
        } catch (err) {
            console.log(err)
        }
        res.send({success:true, message:'user successfully updated!'})
    }
    else {
        res.send({success: false, message:'Verify You Are Human'})
        console.log('form submission failed')
    }

}

const deleteUser = async(req,res) => {
    const filePath = './database/user.json'

    const id = req.body.id

    let databaseArray = []
    databaseArray = await readFromFile(filePath)
    const updatedDatabaseArray = databaseArray.filter(user => user.id !== id);
    const dataArrString = JSON.stringify(updatedDatabaseArray,null,2)
        try {
            await fs.writeFile(filePath,dataArrString)
            console.log('file successfully written!')
        } catch (err) {
            console.log(err)
        }
        res.send({success:true, message:'user Successfully deleted!'})

}

module.exports = {saveUserData,login, registerUser, getUsers, updateUser, deleteUser}