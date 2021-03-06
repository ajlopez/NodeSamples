
var simplemessages = require('simplemessages');
        
var client = simplemessages.createClient(3001, 'localhost');

client.on('data', function(sectorinfo) {
    console.log(sectorinfo);
    client.write(calculateSector(sectorinfo));
});

function calculateSector(sectorinfo)
{
	var values = [];

	for (var x = 0; x < sectorinfo.width; x++)
		for (var y = 0; y < sectorinfo.height; y++)
			values[y * sectorinfo.width + x] = getValue(sectorinfo.realminimum + (x + sectorinfo.fromx) * sectorinfo.delta, sectorinfo.imgminimum + (y + sectorinfo.fromy) * sectorinfo.delta, sectorinfo.maxiterations - 1, sectorinfo.maxvalue);

	var sector = {
		fromx: sectorinfo.fromx,
		fromy: sectorinfo.fromy,
		width: sectorinfo.width,
		height: sectorinfo.height,
		values: values
	};

	return sector;
}

function getValue(realc, imaginaryc, maxiter, maxmagsquared)
{
	var realz = 0;
	var imaginaryz = 0;
	var realz2 = 0;
	var imaginaryz2 = 0;
	var value = 0;

	while ((value < maxiter) && (realz2 + imaginaryz2 < maxmagsquared))
	{
		realz2 = realz * realz;
		imaginaryz2 = imaginaryz * imaginaryz;
		imaginaryz = 2 * imaginaryz * realz + imaginaryc;
		realz = realz2 - imaginaryz2 + realc;
		value++;
	}
	
	return value;
}

