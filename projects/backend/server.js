const fastify = require('fastify')({
    logger:true,
    bodyLimit: 100000
});
const path = require('path');
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
require('dotenv').config();
fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/jwt'), {
  // secret: 'supersecret'  // Replace 'supersecret' with an environment variable for production
  secret: process.env.SECRET_KEY
});

// fastify.decorate('authenticate', async function (request, reply) {
//   try {
//     await request.jwtVerify();  // Verifies the JWT token in requests
//   } catch (err) {
//     reply.send(err);  // Send error if verification fails
//   }
// });
const start = async () => {
    try {
      await fastify.listen({port: 3000,  host:'0.0.0.0'})
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()

