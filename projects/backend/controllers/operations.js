// const database = require('../database/user.json')
const fs = require('fs').promises
const axios = require('axios');
const { stat } = require('fs');


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


async function isCaptchaValid(captcha_token){
    const captcha_api = process.env.CAPTCHA_API;
    try {
        const result = await axios.post(captcha_api, {
            challenge_id: captcha_token,
            site_key: process.env.SITE_KEY,
            secret_key: process.env.SECRET_KEY,
        })
        return result.data.success
    } catch (error) {
        return false
    }
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
    const filePath = './database/users.json'
    const databaseArray = await readFromFile(filePath)
    let result = {success: false, message: `Wrong Username or Password!`, userRole:''}

    for(const user of databaseArray){
        if(user.email === userData.email){
            if(user.password === userData.password){
                result.success = true
                result.message = `Welcome Here!!`
                result.userRole = user.role
            }
        }
    }
    console.log('this is result:',result)
    return result
}


const saveUserData = async(req,res) => {
    const { v4: uuidv4 } = require('uuid'); 
    const {'arcaptcha-token':arcaptcha_token} = req.body
    const isArcaptchaValid = await isCaptchaValid(arcaptcha_token)
    const filePath = './database/customers.json'
    const uniqueId = uuidv4()
    const createdDate = getTime()
    const { 'arcaptcha-token': _, ...customerData } = req.body;
    if (isArcaptchaValid) {
        const userData = {
            id: uniqueId,
            ...customerData,
            createdDate: createdDate,
            lastUpdate: createdDate,
            status: 'pending',
            supervisorExplanation: ''
        }
        writeToFile(userData,filePath)
        res.send({success: true, message: 'Your form successfully submited!'})
    } else {
        res.send({success: false, message:'Verify You Are Human'})
        console.log('form submission failed')
    }
}

const createCustomer = async(req,res) => {
    const { v4: uuidv4 } = require('uuid'); 
    
    const filePath = './database/customers.json'
    const uniqueId = uuidv4()
    const createdDate = getTime()
    const { role, email, action, id, ...customerData } = req.body;
    const {name} = req.body

    const userData = {
        id: uniqueId,
        ...customerData,
        createdDate: createdDate,
        lastUpdate: createdDate,
        status: 'pending',
        supervisorExplanation: ''
    }
    writeToFile(userData,filePath)
    const logData = role + " " + email + " "+ action + " " + name + " data at " + createdDate
    writeToFile(logData,'./database/logs.json')
    res.send({success: true, message: 'Your form successfully submited!'})
}

const login = async (fastify, req, res) => {
    const {email, password,'arcaptcha-token':arcaptcha_token } = req.body
    const isArcaptchaValid = await isCaptchaValid(arcaptcha_token)
    if(isArcaptchaValid){
        const userData = {
            email,
            password
        }
        const result = await verifyUser(userData)
        if(result.success){
            const token = fastify.jwt.sign({email: email, role: result.userRole}, { expiresIn: '1h' });
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
    const { v4: uuidv4 } = require('uuid'); 
    const {email, password, newUserRole,tokenEmail,action, role } = req.body
    console.log('this is req body:',req.body)
    const id = uuidv4()
    const userData = {
        id,
        email,
        password,
        role:newUserRole
    }
    const path = './database/users.json'
    const dataArrString = await writeToFile(userData,path)
    const date = getTime()
    const logData = role + " " + tokenEmail + " "+ action + " " + newUserRole + " " + email + " data at " + date
    writeToFile(logData,'./database/logs.json')
    res.send({success: true, message: 'User successfully registered!'})
}

const getUsers = async(req,res) => {
    const path = req.headers['x-file-path']
    const users = await readFromFile(path)
    res.send(users)
}

const updateUser = async(req,res) => {
    const id = req.body.id
    console.log(req.body)
    const password = req.body.password
    
    const {name, companyName, jobPosition, phoneNumber, explanation, role ,status, email, action,supervisorExplanation} = req.body
    const date = getTime()
    let logData = role + " " + email + " "+ action + " " + name + " data at " + date
    let databaseArray = []
    let filePath = './database/customers.json'
    if(password){
        filePath = './database/users.json'
        logData = role + " " + email[1] + " "+ action + " " + email[0] + " data at " + date
    }
    databaseArray = await readFromFile(filePath)
    updatedDatabaseArray = databaseArray.map(user => {
        if(user.id === id){
            if(password){
                return{...user, email:email[0], password, role:status}

            }
            return{...user, name, companyName, jobPosition, phoneNumber, explanation, status, supervisorExplanation, lastUpdate:date}
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
    writeToFile(logData,'./database/logs.json')
}

const deleteUser = async(req,res) => {
    const filePath = req.headers['x-file-path']

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

const addLog = async(request, reply) => {
    const {email, role, name, action } = request.body
    const date = getTime()
    const logData = role + " " + email + " "+ action + " " + name + " data at " + date
    writeToFile(logData,'./database/logs.json')

}
module.exports = {saveUserData,login, registerUser, getUsers, updateUser, deleteUser,downloadUsers, addLog,createCustomer}