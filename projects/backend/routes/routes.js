const {saveUserData} = require('../controllers/operations')
const {login} = require('../controllers/operations')
const {registerUser} = require('../controllers/operations')
const {getUsers} = require('../controllers/operations')
const {updateUser} = require('../controllers/operations')
function routes(fastify,options,done){
    fastify.register(require('@fastify/formbody'));
    fastify.post('/upload',saveUserData)
    fastify.post('/login', async (request, reply) => {
        await login(fastify, request, reply);
    });
    fastify.post('/registerUser', async (request, reply) => {
        await registerUser(fastify, request, reply);
    });

    fastify.get('/getSalesManagers', async (request, reply) => {
        await getUsers('./database/salesManagers.json', request, reply);
    });
    fastify.get('/getUsers', async (request, reply) => {
        await getUsers('./database/user.json', request, reply);
    });
    fastify.post('/updateUser',updateUser)
    done()
}

module.exports = routes