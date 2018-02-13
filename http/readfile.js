var http = require('http');
var url =  require('url');
var fs  = require ('fs');


http.createServer(function(req , res){
   res.writeHead(200 , {'Content-Type':'text/plain;charset=utf-8'});
   router(req, res);
   //res.write('what the fuck');
   //res.end('');
}).listen(2018)


function router(req , res){
   var pathname = url.parse(req.url).pathname.replace(/\//,'');
   var path = '';
   if(pathname === 'login'){
      path = './file/login.txt';  
   }else if(pathname === 'logout'){
      path = './file/logout.txt';
   }else{
   	  path = './file/error.txt';
   }

   readFile(path , function(data){
      res.write(data);
      res.end();
   })
}


//同步读取文件
function readFileSync(path){
  var data = fs.readFileSync(path , 'utf-8');
  console.log(data);
  return data;
}


//异步读取文件
function readFile(path , callBack){
  fs.readFile(path , 'utf-8' , function(err , data){
  	if(err){
  	  throw err;
  	  return;
  	}
  	callBack(data);
    console.log(data);
  })
}