const fastify = require('fastify')({logger:true});
fastify.register(require('./routes/crudRouts'))

fastify.get('/items',(req,res)=>{
    res.send({test: 'Hello'})
})


const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
}
start()

