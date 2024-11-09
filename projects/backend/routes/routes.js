const {saveUserData, downloadUsers, addLog, createCustomer} = require('../controllers/operations')
const {login} = require('../controllers/operations')
const {registerUser} = require('../controllers/operations')
const {getUsers} = require('../controllers/operations')
const {updateUser} = require('../controllers/operations')
const {deleteUser} = require('../controllers/operations')
const fs = require('fs');

function routes(fastify,options,done){
    fastify.register(require('@fastify/formbody'));
    fastify.post('/upload',saveUserData)
    fastify.post('/createCustomer',createCustomer)

    fastify.post('/login', async (request, reply) => {
        await login(fastify, request, reply);
    });
    fastify.post('/registerUser', async (request, reply) => {
        await registerUser(fastify, request, reply);
    });

    // fastify.get('/getSalesManagers', async (request, reply) => {
    //     await getUsers('./database/users.json', request, reply);
    // });
    fastify.get('/getUsers', async (request, reply) => {
        await getUsers(request, reply);
    });
    fastify.post('/updateUser',updateUser)
    fastify.delete('/deleteUser', deleteUser)
    // fastify.get('/downloadUsersList', async (request,reply) =>{
    //     await downloadUsers(request, reply)
    // })
    fastify.get('/downloadUsersList', downloadUsers);
    fastify.post('/addLogs',addLog)
    fastify.get('/getLogs', async (request, reply) => {
        await getUsers('./database/logs.json', request, reply);
    });
    done()
}

module.exports = routes