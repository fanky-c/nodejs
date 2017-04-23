
var r = 0;

function printInt(r){
     console.log(r);
}

function plus(callback){
     setTimeout(function(){
          r += 1;
     	  callback(r);
     },0)
}


plus(printInt);
plus(function(r){
	  console.log(r)
})