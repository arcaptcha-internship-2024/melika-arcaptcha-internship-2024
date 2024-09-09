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
    if(index == -1){
        array.push(item)
    }
    else{
        array[index] = item
    }
    return array
    
}


var server = http.createServer(function(req, res){
    let body = ''
    let url = req.url
    // console.log(body.length)
    req.on('data', chunk =>{
        console.log('you have recieved data!!!!!!')
        body += chunk.toString()
    })

    req.on('end',()=>{
        
        let parsedBody = {};
        
    // Parse the body only if it is not empty
        if (body.trim()) {
            // console.log(`this is your fucking body: ${body.length}`)
            console.log(body)
            parsedBody = JSON.parse(body);}
        
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
                res.end('you are in delete page')
                break;
            default:
                res.end('use create, read, update and delete paths')
                break;
        }
    })
    
    
})


server.listen(3000, '127.0.0.1')
console.log('Im listening on port 3000')