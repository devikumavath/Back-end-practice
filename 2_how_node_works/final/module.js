//console.log(arguments);

// console.log(require('module').wrapper);


// module exports
const c = require('./test-module-1');
const calc1 = new c();
console.log(calc1.add(2,5));

//exports
const calc2 = require('./test-module-2');
console.log(calc2.add(10,10));
//------------------or----------
const {add , multiply , divide } = require('./test-module-2');
console.log(multiply(10,4));


//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();