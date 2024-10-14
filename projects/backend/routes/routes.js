const {saveUserData} = require('../controllers/operations')
const {login} = require('../controllers/operations')
function routes(fastify,options,done){
    fastify.register(require('@fastify/formbody'));
    fastify.post('/upload',saveUserData)
    fastify.post('/login',login)
    done()
}

module.exports = routes