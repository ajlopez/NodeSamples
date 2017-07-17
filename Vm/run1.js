
var vm = require('vm');

var sandbox = vm.createContext({ one: 1, two: 2 });
vm.createContext(sandbox);

var fn = vm.runInContext("fnone = function () { return one; }", sandbox);

console.log(sandbox.fnone());
console.log(fn());
one = 42;
console.log(fn());

