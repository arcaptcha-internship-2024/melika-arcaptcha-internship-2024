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

const add = (req,res) => {
    const {arrayName} = req.params
    const {element} = req.body
    const arrayObj = database.find((item) => item.arrayName == arrayName)
    console.log(`this is the array object: ${arrayObj} \n`)
    arrayObj.content.push(element)

    res.send(arrayObj)
}

const update = (req,res) => {
    const {arrayName} = req.params
    const {oldValue} = req.body
    const {newValue} = req.body

    const arrayObj = database.find((item) => item.arrayName == arrayName)
    const index = arrayObj.content.indexOf(oldValue)
    arrayObj.content[index] = newValue

    res.send(arrayObj)
}

module.exports = {
    readAll,
    read,
    create,
    add,
    update
  }