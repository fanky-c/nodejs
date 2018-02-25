'use strict';
var http = require('http');
var events = require('events');

class MyEmitter extends events {}

const myEmitter = new MyEmitter();

http.createServer((req,res)=>{   
   var Users = new User();
   
   myEmitter.once('registerSuccess' , function(name , pwd , email){
      Users.login(req,res);
   })

   Users.register(req,res);    
}).listen(2018)





function User(){	
  this.register = function(req , res){
    req['name'] = 'zhaochao';
    req['pwd'] = 'chaozhao';
    req['email'] = '396850524@qq.com';   
    myEmitter.emit('registerSuccess', req['name'], req['pwd'], req['email']);  //注册事件
    console.log('注册成功');
  }
  this.login = function(req , res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});	  	
    res.write('用户名：'+req['name']);
    res.write('；密码：'+req['pwd']);
    res.write('；邮件：'+req['email']);
    res.end('；登录成功。');
    console.log('登录成功');
  }
}
