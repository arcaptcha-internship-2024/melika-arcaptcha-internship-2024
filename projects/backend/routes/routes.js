const {saveUserData} = require('../controllers/operations')

function routes(fastify,options,done){
    fastify.post('/addUser',saveUserData)
    done()
}

module.exports = routes