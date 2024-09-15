const fastify = require('fastify')({
    logger:true,
    bodyLimit: 100000
});
const path = require('path');
fastify.register(require('./routes/routes'))
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '../frontend'),
    prefix: '/',
  });

fastify.register(require('@fastify/formbody'));

const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()

