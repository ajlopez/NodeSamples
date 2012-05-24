var express = require('express');
var fs = require('fs');

var model = JSON.parse(fs.readFileSync('./model.json').toString());

var headertext = fs.readFileSync('./header.html').toString();
var footertext = fs.readFileSync('./footer.html').toString();

var menutext = '';

model.pages.forEach(function(page) {
	menutext += "<li><a href='" + page.url + "'>" + page.title + "</a></li>\n";
});

function renderHeader(req, res, page)
{
	var header = headertext
	    .replace(/\${title}/g, page.title)
	    .replace(/\${sitetitle}/g, model.title)
	    .replace(/\${menu}/g, menutext);
		
	res.write(header);
}

function renderFooter(req, res, page)
{
	res.write(footertext);
}

function definePage(page)
{
	return function(req, res)
	{
		renderHeader(req, res, page);
		
		if (page.content)
			res.write(page.content);
			
		renderFooter(req, res, page);
		res.end();
	}
}

function registerPage(app, page)
{
	app.get(page.url, definePage(page));
}

function registerPages(app, pages)
{
	var npages = pages.length;
	
	for (var k = 0; k < npages; k++)
		registerPage(app, pages[k]);
}

express.createServer()
  .use(express.favicon())
  .use(express.logger())
  .use('/content', express.static(__dirname + '/content'))
  .use(express.router(function(app){
		registerPages(app, model.pages);
  })).listen(8000);
  
console.log('listening to http://localhost:8000');
