function learn(something){
    console.log(something);
}


function we(something, callback){
     something += 'is cool';
     callback(something);
}

we('nodejs', learn); //调用方式1
we('gulp', function(something){  //匿名方式调用
	   console.log(something); 
})