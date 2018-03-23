const fs = require('fs');
const Mustache = require('mustache');
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pdf', (req, res) => {

  const writePdf = (err, stream) => {
    if (err) return res.status(500).send({ error: 'Erro ao gerar pdf.' });
    res.contentType("application/pdf");
    stream.pipe(res)
    stream.on('end', () => res.end());
  };

  const readHtml = (err, data) => {
    const html = Mustache.render(data, { name: 'Renato' })
    pdf.create(html, { format: 'A4' }).toStream(writePdf);
  };

  fs.readFile('./templates/poc.html', 'utf8', readHtml);
});

const server = app.listen(8081, () => {
  const host = server.address().address
  const port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

