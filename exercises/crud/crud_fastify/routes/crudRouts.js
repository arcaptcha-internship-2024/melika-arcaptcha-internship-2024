const{read} = require('../controllers/crudOperations')


const getAllArrays = {
    handler: read
}


function crudRoutes(fastify,options,done){
    // Get all Arrays
    fastify.get('/read', getAllArrays)
    done()
}

module.exports = crudRoutes