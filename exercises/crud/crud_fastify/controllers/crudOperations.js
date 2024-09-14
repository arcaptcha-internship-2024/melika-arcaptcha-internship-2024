let database = require('../database')

const read = (req,res) =>{
    res.send(database)
}

module.exports = {
    read
  }