var http = require('http');
var fs = require('fs');
var url = require('url');


http.createServer(function(req , res){
  res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'});
  res.write('hello world');
  res.end('');
}).listen(2018)



function writefile(file, data, callBack){
   fs.writefile(file, data , (err)=>{
     if(err) throw err;
     callBack && callBack();
   })
}


function writefilesync(file, data, callBack){
   fs.writefilesync(file , data);
   callBack && callBack();
}