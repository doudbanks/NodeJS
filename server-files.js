const http = require('http');
const { createReadStream } = require('fs');

function serveStaticFile(req, res) {
  const url = require('url');
  const components = url.parse(req.url);

  let fileName = components.pathname === '/' ? 'index' : components.pathname;

  streamStaticFile(fileName, res);
};

function streamStaticFile(fileName, res) {
  const { createReadStream } = require('fs');
  const stream = createReadStream(`./static/${fileName}.html`, 'utf8');

  stream.on('error', e => {
    console.error(e);
    streamStaticFile('404', res);
  })
    .pipe(res);
}

const server = http.createServer();
server.on('request', serveStaticFile);

server.listen(8080);
