'use strict';

var pre = process.memoryUsage();
console.log('pre', pre);
function f() {
  var obj = {x: 12};
  return obj.x;
}
function test() {
  for (var i =0;i<10000000;i++) {
    f();
  }
}
test();

var post = process.memoryUsage();
console.log('post', post);