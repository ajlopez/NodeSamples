
var calc = require('./calculator'),
    assert = require('assert');
    
// add
    
assert.ok(calc);
assert.ok(calc.add);

assert.equal(calc.add(1, 2), 3);
assert.equal(calc.add(2, -3), -1);

// sub

assert.ok(calc.sub);
assert.equal(calc.sub(2, 1), 1);
assert.equal(calc.sub(3, 4), -1);








