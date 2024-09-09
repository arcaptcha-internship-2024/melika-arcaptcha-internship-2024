var http = require('http')

let database = []
function create(){
    let userArray = ['test']
    database.push(userArray)
    return userArray
}

function read(){
    return database[0]
}



var server = http.createServer(function(req, res){
    let url = req.url
    
    switch (url) {
        case '/create':
            let createdArray = create()
            console.log("your array is created!!" + createdArray)
            res.end("your array is created!!")
            break;
        case '/read':
            let readArray = read()
            res.end(`this is your array : [${readArray}]`)
            break;
        case '/update':
            res.end('you are in update page')
            break;
        case '/delete':
            res.end('you are in delete page')
            break;
        default:
            res.end('use create, read, update and delete paths')
            break;
    }
})


server.listen(3000, '127.0.0.1')
console.log('Im listening on port 3000')