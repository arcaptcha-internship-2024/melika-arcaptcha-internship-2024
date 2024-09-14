const{readAll, read, create, add, update,deleteElement} = require('../controllers/crudOperations')

function crudRoutes(fastify,options,done){
    // Get all Arrays
    fastify.get('/readAll', readAll)

    // Get a single Array
    fastify.get('/read/:id', read)

    // Create an Array
    fastify.get('/create/:name', create)

    // Add an element to an array
    fastify.post('/add/:arrayName', add)

    // Add an element to an array
    fastify.put('/update/:arrayName', update)

    // Delete an element from an array
    fastify.delete('/delete/:arrayName', deleteElement)

    done()
}

module.exports = crudRoutes