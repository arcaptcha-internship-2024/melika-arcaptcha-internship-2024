const {saveUserData} = require('../controllers/operations')
const {login} = require('../controllers/operations')
const {registerUser} = require('../controllers/operations')
function routes(fastify,options,done){
    fastify.register(require('@fastify/formbody'));
    fastify.post('/upload',saveUserData)
    fastify.post('/login', async (request, reply) => {
        await login(fastify, request, reply);
    });
    fastify.post('/registerUser', async (request, reply) => {
        await registerUser(fastify, request, reply);
    });
    done()
}

module.exports = routes