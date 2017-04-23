function Pet(words){
    this.words = words;
    this.speak = function(){
    	  console.log(this.words);
    }
}


function Dog(words){
	  Pet.call(this, words);
	  //Pet.apply(this, arguments);
}

var a = new Dog('my name is dog');

a.speak();