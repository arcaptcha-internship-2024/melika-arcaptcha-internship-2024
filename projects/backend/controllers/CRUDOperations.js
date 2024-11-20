const fs = require('fs').promises;
const {Client} = require('pg')

async function createDBConnection() {
    const myDatabase = new Client({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: process.env.DATABASE_PASSWORD,
        database: "arcaptchaInternshipProject",
    })
    return myDatabase
}


async function read(table){
    const myDatabase = await createDBConnection()
    try {
        await myDatabase.connect();
        const res = await myDatabase.query(`SELECT * FROM ${table}`);
        databaseArray = res.rows;
        return databaseArray;
    } catch (err) {
        console.error('Database query error:', err.message);
        throw err;
    } finally {
        await myDatabase.end();
    }
}


async function update(table, userData) {
    const myDatabase = await createDBConnection()
    try {
        await myDatabase.connect();
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
        await myDatabase.end();
    }
}


async function write(userData, filePath) {
    console.log('this is user data: ',userData)
    console.log('this is table name: ', filePath)
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
        await myDatabase.end();
    }

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
    read,
    write,
    downloadUsers,
    update
};
