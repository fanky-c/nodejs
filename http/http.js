var http = require('http');

http.createServer(function(req, res){
   if(req.url !== '/favicon.ico'){  //清楚浏览器默认的二次访问(部分浏览器可能不一样)
       console.log('访问！');	
       res.writeHead(200, {'Content-Type':'text/plain'});
       res.write('hello word');
       res.end();
   }
}).listen(2017)