const{readAll, read} = require('../controllers/crudOperations')


const getAllArrays = {
    handler: readAll
}

const getArray = {
    handler: read
}


function crudRoutes(fastify,options,done){
    // Get all Arrays
    fastify.get('/readAll', getAllArrays)

    // Get a single Array
    fastify.get('/read/:id', getArray)
    done()
}

module.exports = crudRoutes