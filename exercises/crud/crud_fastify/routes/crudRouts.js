const{readAll, read, create} = require('../controllers/crudOperations')


const getAllArrays = {
    handler: readAll
}

const getArray = {
    handler: read
}

const createArray = {
    handler: create
}


function crudRoutes(fastify,options,done){
    // Get all Arrays
    fastify.get('/readAll', getAllArrays)

    // Get a single Array
    fastify.get('/read/:id', getArray)

    // Create an Array
    fastify.get('/create/:name', createArray)
    done()
}

module.exports = crudRoutes