var http = require('http');
var fs = require('fs');
var url = require('url');



var router = (req, res) =>{
  var pathname = url.parse(req.url).pathname.replace(/\// , '');
  if(pathname == 'writefile'){
    let data = 'test';
    writefile('./file/writefile.txt' , data , () => {
      console.log('writefile done');
    }) 
  }   
}


http.createServer(function(req , res){
  res.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'});
  res.write('创建文件');
  router(req, res);
  res.end('');  
}).listen(2018)




function writefile(file, data, callBack){
   fs.writeFile(file, data , (err)=>{
     if(err) throw err;
     callBack && callBack();
   })
}


function writefilesync(file, data, callBack){
   fs.writeFileSync(file , data);
   callBack && callBack();
}