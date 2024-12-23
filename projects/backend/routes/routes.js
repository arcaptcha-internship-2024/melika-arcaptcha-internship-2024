const {saveUserData,
       addLog, 
       createCustomer, 
       login, 
       registerUser, 
       getUsers, 
       updateUser, 
       deleteUser,
       sendComment,
       getUsersById} = require('../controllers/operations')
const {downloadUsers} = require('../controllers/CRUDOperations')


function routes(fastify,options,done){
    fastify.register(require('@fastify/formbody'));
    fastify.post('/api/customer/submit',saveUserData)
    fastify.post('/api/customer/add',createCustomer)
    fastify.post('/api/login', async (request, reply) => {
        await login(fastify, request, reply);
    });
    fastify.post('/api/operator/add', async (request, reply) => {
        await registerUser(fastify, request, reply);
    });
    fastify.get('/api/users/get', async (request, reply) => {
        await getUsers(request, reply);
    });
    fastify.post('/api/comment/getAll', async (request, reply) => {
        await getUsersById(request, reply);
    });
    fastify.post('/api/user/update',updateUser)
    fastify.delete('/api/user/delete', deleteUser)
    fastify.get('/api/users/download', downloadUsers);
    fastify.post('/api/logs/add',addLog)
    fastify.post('/api/comment/add',sendComment)
    fastify.get('/api/logs/get', async (request, reply) => {
        await getUsers(request, reply);
    });
    done()
}

module.exports = routes