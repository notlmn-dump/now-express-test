const express = require('express');
const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const app = express();

app.get('*', async (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200);

  const response = [];

  response.push('<pre>');

  try {
    const content = await readFile('/tmp/data.txt', {encoding: 'utf-8'});
    response.push('Found file: ', content);
  } catch (error) {
    response.push('[ERR] Could not read file!');
    response.push(error);

    try {
      await writeFile('/tmp/data.txt', 'Hello, World!');
      response.push('Wrote data to file!');
    } catch (error) {
      response.push('[ERR] Could not write to file!');
      response.push(error);
    }
  }

  response.push('</pre>');

  res.end(response.join('\n'));
});

module.exports = app;
