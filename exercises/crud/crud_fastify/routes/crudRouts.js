const{readAll, read, create, add, update} = require('../controllers/crudOperations')


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

const updateElement = {
    handler: update
}

function crudRoutes(fastify,options,done){
    // Get all Arrays
    fastify.get('/readAll', getAllArrays)

    // Get a single Array
    fastify.get('/read/:id', getArray)

    // Create an Array
    fastify.get('/create/:name', createArray)

    // Add an element to an array
    fastify.post('/add/:arrayName', addElement)

    // Add an element to an array
    fastify.put('/update/:arrayName', updateElement)

    done()
}

module.exports = crudRoutes