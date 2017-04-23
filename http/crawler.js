var http = require('http');
var url = 'http://www.imooc.com/learn/348';

http.get(url, function(res){
     var _html = '';

     res.on('data', function(data){
         _html += data;
     })

     res.on('end', function(){
     	 console.log(_html);
     })
}).on('error', function(err){
	  console.log('抓取数据失败！');	
});
