var http = require('http')

function create(){
    let userArray = []
    return userArray
}

var server = http.createServer(function(req, res){
    let url = req.url
    
    switch (url) {
        case '/create':
            let array = create()
            console.log("your array is created!!")
            res.end(`[${array}]`)
            break;
        case '/read':
            res.end('you are in read page')
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