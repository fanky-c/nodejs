var http = require('http');
var fs = require('fs');
var url = require('url');


http.createServer((req , res) => {
   router(req , res);
}).listen(2018);


function router(req , res){
   var pathname = url.parse(req.url).pathname.replace(/\//,'');
   if(pathname == 'login'){
     readfile('./html/login.html', (data)=>{
       res.writeHead(200 , {'Content-Type':'text/html,charset=utf-8'});
       res.write(data);
       res.end();
     })
   }else if(pathname == 'showImg'){
     readimg('./imgs/abc.jpg', (data)=>{
       res.writeHead(200 , {'Content-Type':'image/jpeg,charset=utf-8'});
       res.write(data , 'binary');
       res.end();       
     })
   }else{
       res.writeHead(200 , {'Content-Type':'text/html,charset=utf-8'});
       res.write('hello world');
       res.end();   	
   }
}

function readfile(path , callBack){
   fs.readFile(path, 'utf-8' , (err , data)=>{
   	 if(err){
   	 	throw err;
   	 	return;
   	 };     
     callBack && callBack(data);
   })
}


function readimg(path , callBack){
   fs.readFile(path , 'binary' , (err , data)=>{
      if(err){
      	throw err;
      	return;
      }

      callBack && callBack(data);
   })
}