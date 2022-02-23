var http = require("http")
var url = require("url")
var port = 3000
var fileSystem = require('fs')

http.createServer(function(request, response){
    var pathName = request.url
    var fileName = "index.html"

    //load file using the filesystem
    fileSystem.readFile(fileName, callBack);

    function callBack(err,data){
        if(err){
            console.log(err)
            response.writeHead(200,{"Content-type":"text/html"})
            response.write("<!DOCTYPE><html><body><div> Page not found! received</div></body</html>")
        }
        else{
            response.writeHead(200,{"Content-type":"text/html"})
            response.write(data)
        }
        response.end()
    }
    

}).listen(port)

console.log("Running on port 3000");