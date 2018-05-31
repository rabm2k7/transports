// tus resumable uploads
const tus_host = 'localhost';
const tus_port = '8000';

// start tus-upload server
// docs about this -> https://github.com/tus/tus-node-server

const tus_factory = require('tus-node-server');

const tu_server = new tus_factory.Server();

const path = require('path');
const fs = require('fs');

const writeFile = function(req, res) {
  const filename = req.url === '/' ? 'upload/upload.html' : req.url;
  const filepath = path.join(process.cwd(), filename);
  fs.readFile(filepath, 'binary', (err, file) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.write(err);
      res.end();
      return;
    }

    res.writeHead(200);
    res.write(file);
    res.end();
  });
};

tu_server.datastore = new tus_factory.FileStore({
  path: '/weave/up'
});
//
// tu_server.get('/', writeFile);
// tu_server.get('/upload/jquery-1.12.0.min.js', writeFile);
// tu_server.get('/upload/tus.min.js', writeFile);


const express = require('express');
const app = express();

app.get('*', writeFile);

const uploadApp = express();

uploadApp.all('*', tu_server.handle.bind(tu_server));

app.use('*', uploadApp);

// app.use(express.static('/weave/up'))

app.listen(tus_port, function() {
  console.log('TUS SERVER listening on port: ' + tus_port);
})
