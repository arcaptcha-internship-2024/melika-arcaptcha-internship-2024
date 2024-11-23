const fs = require('fs').promises;
const { create } = require('domain');
const {Client} = require('pg')
const myDatabase = require('../database/database.js');
const { table } = require('console');

async function createDBConnection() {
    const myDatabase = new Client({
        host: "localhost",
        user: "postgres",
        password: process.env.DATABASE_PASSWORD  
    })
    return myDatabase
}


async function read(table){
    // const myDatabase = await createDBConnection()
    try {
        // await myDatabase.connect();
        const res = await myDatabase.query(`SELECT * FROM ${table}`);
        databaseArray = res.rows;
        return databaseArray;
    } catch (err) {
        console.error('Database query error:', err.message);
        throw err;
    } finally {
        // await myDatabase.end();
    }
}


async function update(table, userData) {
    // const myDatabase = await createDBConnection()
    try {
        // await myDatabase.connect();
        if(table === 'customers'){
            const query = `
                UPDATE ${table}
                SET "name" = $2,
                    "companyName" = $3,
                    "jobPosition" = $4,
                    "phoneNumber" = $5,
                    "explanation" = $6,
                    "createdDate" = $7,
                    "lastUpdate" = $8,
                    "status" = $9,
                    "supervisorExplanation" = $10
                WHERE "id" = $1
            `;
            const values = [
                userData.id,
                userData.name,
                userData.companyName,
                userData.jobPosition,
                userData.phoneNumber,
                userData.explanation,
                userData.createdDate,
                userData.lastUpdate,
                userData.status,
                userData.supervisorExplanation,
            ];
            console.log('hello')
            await myDatabase.query(query, values);
            return true
    
        }else if(table === 'users'){
            const query = `
                UPDATE ${table}
                SET "email" = $2,
                    "password" = $3,
                    "role" = $4
                WHERE "id" = $1
            `;
            const values = [
                userData.id,
                userData.email,
                userData.password,
                userData.role
            ];
            await myDatabase.query(query, values);
            return true
        }
    } catch (err) {
        console.error('Database query error:', err.message);
        throw err;
    } finally {
        // await myDatabase.end();
    }
}


async function write(userData, filePath) {
    console.log('this is user data: ',userData)
    console.log('this is table name: ', filePath)
    // const myDatabase = await createDBConnection()
    
    try {
        // await myDatabase.connect();
        if(filePath === 'customers'){
            const query = `
                INSERT INTO ${filePath} ("id", "name", "companyName", "jobPosition", "phoneNumber", "explanation", "createdDate", "lastUpdate", "status", "supervisorExplanation")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `;
            const values = [
                userData.id,
                userData.name,
                userData.companyName,
                userData.jobPosition,
                userData.phoneNumber,
                userData.explanation,
                userData.createdDate,
                userData.lastUpdate,
                userData.status,
                userData.supervisorExplanation,
            ];
            console.log('query',query, values)
            await myDatabase.query(query, values);

        }else if(filePath === 'users'){
            const query = `
                INSERT INTO ${filePath} ("id", "email", "password", "role")
                VALUES ($1, $2, $3, $4)
            `;
            const values = [
                userData.id,
                userData.email,
                userData.password,
                userData.role
            ];
            await myDatabase.query(query, values);

        }else{
            const query = `
                INSERT INTO ${filePath} ("log")
                VALUES ($1)
            `;
            const values = [
                userData
            ];
            
            await myDatabase.query(query, values);

        }


        console.log('User added to database successfully!');
    } catch (err) {
        console.error('Error inserting data into database:', err.message);
        throw err;
    } finally {
        // await myDatabase.end();
    }

}

const createTable = async () => {
    // const myDatabase = new Client({
    //     host: "db", // Use the service name from Docker Compose
    //     user: "postgres",
    //     password: "thisisKamelika13",
    //     database: "postgres", // Default database in PostgreSQL
    //     port: 5432, // PostgreSQL default port
    // });

    try {
        console.log('trying to connect to database')
        // await myDatabase.connect();
        console.log('connected!')
        // await myDatabase.query(`DROP TABLE IF EXISTS users`)
        // await myDatabase.query(`DROP TABLE IF EXISTS customers`)
        // await myDatabase.query(`DROP TABLE IF EXISTS logs`)


        await myDatabase.query('CREATE TABLE IF NOT EXISTS users ("id" text PRIMARY KEY, "email" text, "password" text, "role" text)')
        console.log('users database Created!')
        await myDatabase.query('CREATE TABLE IF NOT EXISTS customers ("id" text PRIMARY KEY, "name" text, "companyName" text, "jobPosition" text, "phoneNumber" text, "explanation" text, "createdDate" text, "lastUpdate" text, "status" text, "supervisorExplanation" text)')
        console.log('customers database Created!')
        await myDatabase.query('CREATE TABLE IF NOT EXISTS logs ("log" text)')
        console.log('logs database Created!')
        await myDatabase.query(`
            INSERT INTO users ("id", "email", "password", "role")
            SELECT '1', 'melika@gmail.com', '12345m', 'admin'
            WHERE NOT EXISTS (SELECT 1 FROM users);
        `);

        console.log('Data inserted!');

        // Retrieve the data to send as the response
        const result = await myDatabase.query('SELECT * FROM users');
        console.log('Data fetched!');
        reply.send(result.rows)
    } catch (error) {
        console.log('error: ',error)
    }
}

const getTest = async (request, reply) => {
    console.log(request.body)
    const result = await myDatabase.query('SELECT * FROM customers');
    reply.send(result.rows)
}


const downloadUsers = async (request,reply) => {
    const fs = require('fs');
    const path = require('path');
    console.log('hiiiiiii')
    try {
        const tableName = request.headers['x-file-path']
        const result = await myDatabase.query(`SELECT * FROM ${tableName}`);
        const tableData = result.rows;
        console.log(tableData)
        const jsonData = JSON.stringify(tableData, null, 2);
        console.log(jsonData)
        reply.header('Content-Disposition', `attachment; filename=${tableName}.json`);
        reply.header('Content-Type', 'application/json');
        reply.send(jsonData)
    } catch (error) {
        console.error('Error exporting data:', error.message);
        reply.status(500).send({ error: 'Failed to export data' });
    }
    
}



module.exports = {
    read,
    write,
    downloadUsers,
    update,
    createTable,
    getTest
};
