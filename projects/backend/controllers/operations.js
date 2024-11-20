// const database = require('../database/user.json')
const fs = require('fs').promises
const axios = require('axios');
const { stat } = require('fs');
const fileOperations = require('./CRUDOperations');
const fastify = require('fastify');


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


async function verifyUser(userData) {
    const databaseArray = await fileOperations.read(process.env.USERS_DATABASE)
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
    const filePath = process.env.CUSTOMERS_DATABASE
    const uniqueId = uuidv4()
    const createdDate = getTime()
    const { 'arcaptcha-token': _, ...customerData } = req.body;
    const userData = {
        id: uniqueId,
        ...customerData,
        createdDate: createdDate,
        lastUpdate: createdDate,
        status: 'pending',
        supervisorExplanation: ''
    }
    fileOperations.write(userData,filePath)
    res.send({success: true, message: 'Your form successfully submited!'})   
}


const createCustomer = async(req,res) => {
    const { v4: uuidv4 } = require('uuid'); 
    
    const filePath = process.env.CUSTOMERS_DATABASE
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
    fileOperations.write(userData,filePath)
    const logData = role + " " + email + " "+ action + " " + name + " data at " + createdDate
    fileOperations.write(logData,process.env.LOGS_DATABASE)
    res.send({success: true, message: 'Your form successfully submited!'})
}


const login = async (fastify, req, res) => {
    const {email, password} = req.body    
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
    const path = process.env.USERS_DATABASE
    fileOperations.write(userData,path)
    const date = getTime()
    const logData = role + " " + tokenEmail + " "+ action + " " + newUserRole + " " + email + " data at " + date
    fileOperations.write(logData,process.env.LOGS_DATABASE)
    res.send({success: true, message: 'User successfully registered!'})
}


const getUsers = async(req,res) => {
    const path = req.headers['x-file-path']
    const users = await fileOperations.read(path)
    res.send(users)
}


const updateUser = async(req,res) => {
    const id = req.body.id
    console.log(req.body)
    const password = req.body.password
    
    const {name, companyName, jobPosition, phoneNumber, explanation,createdDate, role ,status, email, action,supervisorExplanation} = req.body
    const date = getTime()
    const userData = {
        id: id,
        name: name,
        companyName: companyName,
        jobPosition: jobPosition,
        phoneNumber: phoneNumber,
        explanation: explanation,
        createdDate: createdDate,
        lastUpdate: date,
        status: status, 
        supervisorExplanation: supervisorExplanation
    }
   
    let logData = role + " " + email + " "+ action + " " + name + " data at " + date
    // let filePath = process.env.CUSTOMERS_DATABASE
    if(password){
        filePath = process.env.USERS_DATABASE
        logData = role + " " + email[1] + " "+ action + " " + email[0] + " data at " + date
        const userData1 = {
            id:id,
            email: email[0],
            password: password,
            role: status
        }
        console.log('boooooooo')
        if(fileOperations.update(filePath,userData1)){
            res.send({success:true, message:'user successfully updated!'})
        }
    }else{
        if(fileOperations.update('customers',userData)){
            res.send({success:true, message:'user successfully updated!'})
        }
    }
   
    
    // const dataArrString = JSON.stringify(updatedDatabaseArray,null,2)
    // try {
    //     await fs.writeFile(filePath,dataArrString)
    //     console.log('file successfully written')
    // } catch (err) {
    //     console.log(err)
    // }
    // res.send({success:true, message:'user successfully updated!'})
    fileOperations.write(logData,process.env.LOGS_DATABASE)
}


const deleteUser = async(req,res) => {
    const filePath = req.headers['x-file-path']
    const id = req.body.id
    console.log('this is the request: ', req.body)

    const {Client} = require('pg')

    const myDatabase = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "thisisKamelika13",
        database: "arcaptchaInternshipProject",
    })
    
    try {
        await myDatabase.connect();
        const query = `DELETE FROM ${filePath} WHERE id = $1`;
        const values = [id];

        const result = await myDatabase.query(query, values);
        if (result.rowCount > 0) {
           res.send({message:`User with ID ${id} deleted successfully.`, success: true});
        } else {
            res.send({message:`No user found with ID ${id}.`,success: false});
        }

    } catch (err) {
        res.send({message:`Database query error:`,success: false});
        throw err;
    }

}


const addLog = async(request, reply) => {
    console.log('addLog')
    const {email, role, name, action } = request.body
    const date = getTime()
    const logData = role + " " + email + " "+ action + " " + name + " data at " + date
    fileOperations.write(logData,process.env.LOGS_DATABASE)
}


module.exports = {saveUserData,login, registerUser, getUsers, updateUser, deleteUser, addLog,createCustomer}