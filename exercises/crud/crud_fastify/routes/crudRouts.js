const{readAll, read, create, add} = require('../controllers/crudOperations')


const getAllArrays = {
    handler: readAll
}

const getArray = {
    handler: read
}

const createArray = {
    handler: create
}

const addElement = {
    handler: add
}

function crudRoutes(fastify,options,done){
    // Get all Arrays
    fastify.get('/readAll', getAllArrays)

    // Get a single Array
    fastify.get('/read/:id', getArray)

    // Create an Array
    fastify.get('/create/:name', createArray)

    // Add an element to an array
    fastify.post('/add', addElement)
    done()
}

module.exports = crudRoutes