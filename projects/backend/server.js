const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const fastify = require('fastify')({
    logger:true,
    bodyLimit: 100000
});
const { createTable } = require('./controllers/CRUDOperations.js');
const { env } = require('process');
fastify.register(require('./routes/routes'))
// fastify.register(require('@fastify/static'), {
//     root: path.join(__dirname, '../frontend'),
//     prefix: '/',
//     // origin: 'http://localhost:8080'
// });
fastify.register(require('@fastify/cors'), {
  // origin: 'http://localhost:8080'
  origin: '*'
});
require("./hooks/jwt.js")(fastify);

fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/jwt'), {
  secret: process.env.SECRET_KEY
});

const start = async () => {
    try {
      console.log('initializing database...')
      await createTable();
      console.log('')

      await fastify.listen({port: 3000,  host:'0.0.0.0'})
      
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()

