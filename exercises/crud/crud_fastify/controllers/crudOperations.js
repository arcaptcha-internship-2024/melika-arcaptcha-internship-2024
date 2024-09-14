let database = require('../database')

const readAll = (req,res) => {
    res.send(database)
}

const read = (req,res) => {
    const {id} = req.params
    const arrayObj = database.find((item) => item.id == id)
    res.send(arrayObj)
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

const add = (req,res) =>{
    const {arrayName} = req.body
    const {element} = req.body
    const arrayObj = database.find((item) => item.arrayName == arrayName)
    arrayObj.content.push(element)

    
    res.send(arrayObj)

}

module.exports = {
    readAll,
    read,
    create,
    add
  }