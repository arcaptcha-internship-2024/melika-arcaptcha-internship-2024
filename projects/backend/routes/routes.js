const {saveUserData} = require('../controllers/operations')

function routes(fastify,options,done){
    fastify.register(require('@fastify/formbody'));
    fastify.post('/upload',saveUserData)
    done()
}

module.exports = routes