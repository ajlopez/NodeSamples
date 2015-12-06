'use strict'
let pre = process.memoryUsage();

console.log('pre', pre);

function f() {
    let obj = {x: 12};
    return obj.x;
}

function test() {
  for (let i =0;i<10000000;i++) {
    f();
  }
}
test();

let post = process.memoryUsage();
console.log('post', post);
