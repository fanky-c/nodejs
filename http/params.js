var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');


http.createServer((req , res) => {
   router(req , res);
}).listen(2018);


function router(req , res){
   var pathname = url.parse(req.url).pathname.replace(/\//,'');
   if(pathname == 'login'){ 
     //getType(req,res); 
     postType(req,res);
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


//get方式数据
function getType(req,res){
  var rData = url.parse(req.url, true).query;
  console.log('提交的信息：', JSON.stringify(rData))
}

//post方式数据
function postType(req,res){
  var rData = '';
  req.on('data' , function(chuank){
     rData += chuank;
  });
  req.on('end' , function(){
     console.log('提交的信息：', querystring.parse(rData))
  });
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