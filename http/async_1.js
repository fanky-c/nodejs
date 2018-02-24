var http = require('http');
var fs = require('fs');
var url = require('url');
var async = require('async');



http.createServer((req,res)=>{
   res.writeHead(200,{'Content-Type':'text/html,charset=utf-8'});
   res.write('async');
   res.end();
}).listen(2018)



//串行执行
//series函数的第一个参数可以是一个数组也可以是一个JSON对象，
//参数类型不同，影响的是返回数据的格式。
function series(){
	async.series({
		onefun : (callback)=>{
		   var i = 0;
		   var timer = null;
		   timer = setInterval(()=>{
		   	 console.log('one:' , new Date());
             if(++i >= 3){
                clearInterval(timer);
                console.log('onefun done');
                callback(null , 'onefun callback')                
             }
		   } , 1000)
		},
		twofun : (callback)=>{
		   var i = 0;
		   var timer = null;
		   timer = setInterval(()=>{
		   	 console.log('two:' , new Date());
             if(++i >= 3){
                clearInterval(timer);
                console.log('twofun done');
                callback(null , 'twofun callback')                
             }
		   } , 1000)			
		}
	}, (err , res)=>{
        if(err) throw err;
        console.log(res);
	})
}
//series();




//串行执行(函数值可以传递)
//waterfall和series函数有很多相似之处，都是按照顺序执行。
//不同之处是waterfall每个函数产生的值，都将传给下一个函数，而series则没有这个功能
function waterfall(){
  async.waterfall([(callback)=>{
  	 var i = 0;
  	 var timer = null;
  	 timer = setInterval(function(){
  	 	if(++i >= 3){
  	 	  clearInterval(timer);
  	 	  callback(null , i);
  	 	}
  	 } , 1000)
  },
  (arg1,callback)=>{
  	 console.log(arg1);
     callback(null , arg1 , 'two')
  },
  (arg1, arg2 , callback)=>{
  	 console.log(arg1,arg2);
     callback(null , 'all done')
  }] , (err , res)=>{
  	if(err) throw err;
  	console.log(res);
  })	
}
waterfall();