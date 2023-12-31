function sum () { 
    let sum = 0;
    for( let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }

    return sum;
}

// function sum (...args) { 
//     let sum = 0;
//     for( let i = 0; i < args.length; i++){
//         sum += args[i];
//     }

//     return sum;
// }

Function.prototype.myBind = function(context){
    let newArray = Array.from(arguments).slice(1);
    let that = this;

    return function(){
      let innerArray = Array.from(arguments);
  
      that.apply(context, newArray.concat(innerArray));

    }
};






class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true




function curriedSum(numArgs){

    let numbers = [];
    
    function _curriedSum(num){ 
        numbers.push(num);
        if (numbers.length === numArgs) {
           return numbers.reduce((total, current) => total + current);
        } else {
            return _curriedSum;
        }
    
    }

    return _curriedSum;

}



Function.prototype.curry = function(numArgs){
  let numbers = [];
  let that = this;
  function _curriedSum(arg){
    numbers.push(arg);
    if (numbers.length === numArgs){
      return that.apply(null,numbers)
    }else{
      return _curriedSum;
    }
  }
  return _curriedSum
}
