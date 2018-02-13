var http = require('http');
var url = require('url');


http.createServer(function(req , res){
   res.writeHead(200, {'Content-Type':'text/plain'});
   router(req , res)
   res.end();
}).listen(2018)


function router(req , res){
  var pathname = url.parse(req.url).pathname;
  pathname = pathname.replace(/\// , '');
  res.write(pathname); 
}