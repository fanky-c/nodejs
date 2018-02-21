var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req , res){
   res.writeHead(200 , {'Content-Type':'image/jpeg'});
   readimg('./imgs/abc.jpg' , (filedata)=>{
      res.write(filedata , 'binary');
      res.end();
   })
   //res.write('hhh');
   //res.end();
}).listen(2018)



function readimg(path , callBack){
   fs.readFile(path, 'binary' , (err , filedata)=>{
      if(err) throw err;
      callBack && callBack(filedata);
   })
}