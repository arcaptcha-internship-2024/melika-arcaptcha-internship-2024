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


function update(item,index=-1){
    array = database[0]
    index == -1 ? array.push(item) : array[index] = item
    return array
}


function deleteItem(){
    array = database[0]
    array.pop()
    return array
}


var server = http.createServer(function(req, res){
    let body = ''
    let url = req.url

    req.on('data', chunk =>{
        body += chunk.toString()
    })

    req.on('end',()=>{
        let parsedBody = {};
        
        if (body.trim()) {
            parsedBody = JSON.parse(body);
        }
        
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
                let updatedArray;
                if(parsedBody.hasOwnProperty("index")){
                    updatedArray = update(parsedBody.item, parsedBody.index)
                }else{
                    updatedArray = update(parsedBody.item)
                }
                res.end(`this is your array : [${updatedArray}]`)
                break;

            case '/delete':
                let deletedArray = deleteItem()
                res.end(`this is your array : [${deletedArray}]`)
                break;

            default:
                res.end('use create, read, update and delete paths')
                break;
        }
    })
    
    
})


server.listen(3000, '127.0.0.1')
console.log('Im listening on port 3000')