var http = require('http');
var fs = require('fs');
var url = require('url');


var router = (req, res)=>{
   var pathname = url.parse(req.url).pathname.replace(/\//,'');
   res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
   res.write('well done');
   res.end();
}

http.createServer((req, res) => {
	try {
		router1(req, res);
	} catch (err) {
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8'
		});
		res.write(err.toString());
		res.end();
	}
}).listen(2018)

