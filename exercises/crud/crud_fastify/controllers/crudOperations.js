let database = require('../database')

const readAll = (req,res) => {
    res.send(database)
}

const read = (req,res) => {
    const {id} = req.params
    console.log(`this is id: ${id}`)

    const requestedArray = database.find((item) => item.id == id)
    console.log(requestedArray)
    res.send(requestedArray)
}

module.exports = {
    readAll,
    read
  }