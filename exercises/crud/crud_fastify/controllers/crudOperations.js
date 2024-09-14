let database = require('../database')

const readAll = (req,res) => {
    res.send(database)
}

const read = (req,res) => {
    const {id} = req.params
    const requestedArray = database.find((item) => item.id == id)
    res.send(requestedArray)
}

const create = (req,res) => {
    const {name} = req.params
    const newArray = {
        id: database.length,
        name,
        content: []
    }

    database = [...database,newArray]
    res.send(database)
}

module.exports = {
    readAll,
    read,
    create
  }