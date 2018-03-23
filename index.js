var PDFDocument, doc;
var fs = require('fs');
var Mustache = require('mustache');
var pdf = require('html-pdf');

var express = require('express');
var app = express();

app.get('/pdf', (req, res) => {

  const writePdf = (err, stream) => {    
    res.contentType("application/pdf");    
    stream.pipe(res)    
    stream.on('end', () => res.end());
  };

  const readHtml = (err, data) => {
    var html = Mustache.render(data, { name: 'Renato' })
    pdf.create(html, { format: 'A4' }).toStream(writePdf);
  };

  fs.readFile('./templates/poc.html', 'utf8', readHtml);
});

var server = app.listen(8081, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

