
var tnumbers = [ 0 ];

var sums = {};

for (var k = 1; k <= 100; k++)
	tnumbers.push(tnumbers[tnumbers.length - 1] + k);

for (var x1 = 0; x1 <= tnumbers.length; x1++)
	for (var x2 = x1; x2 <= tnumbers.length; x2++)
		for (var x3 = x2; x3 <= tnumbers.length; x3++) {
			var values = [ tnumbers[x1], tnumbers[x2], tnumbers[x3] ];
			var sum = values[0] + values[1] + values[2];
		
			if (!sums[sum])
				sums[sum] = [];
			
			sums[sum].push(values);
		}
	
console.dir(sums);


		