const http = require('http');
const process = require('process');
const url = require('url');

function renderTemplate(req, res, contentCallback) {
  res.writeHead(200, 'Content-Type: text/html');
  res.write(`
<!doctype html>
<html>
  <body>
    ${contentCallback(req, res)}
  </body>
</html>
  `);
};

function renderHome(req, res) {
  return '<h1>Page d\'accueil!</h1>';
};

function renderUsers(req, res) {
  return '<h1>Liste des utilisateurs!</h1>';
};

function renderNotFound(req, res) {
  return '<h1>Page introuvable!</h1>';
};

// function processNextIteration(i) {
//   console.log(i);
//   process.nextTick(() => {
//     processNextIteration(i + 1)
//   });
//   // processNextIteration(i + 1);
// };

function processrequest(req, res) {

  // processNextIteration(0);

  // for (let i = 0; i < 100000; i++) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, 0);
  // }

  // console.log('processRequest - start');

  // console.log(`method = ${req.method}`);
  // console.log(`url = ${req.url}`);
  // console.log(`headers = ${JSON.stringify(req.headers)}`);
  // console.log(`HTTP version = ${req.httpVersion}`);
  // console.log(`IP = ${req.remoteAdress}`);

  const components = url.parse(req.url);
  console.dir(components);

  let data = '';

  req.on('data', (chunk) => {
    data += chunk;
    console.log(data);
  });

  req.on('end', () => {
    console.log('Request end');
  });

  const routes = {
    '/': renderHome,
    '/users': renderUsers,
    '404': renderNotFound
  };

  const routeFn = routes[components.pathname];

  // if (!routeFn) {
  //   routeFn = routes['404'];
  // }

  renderTemplate(req, res, (routeFn || routes['404']));

  res.end();
};

const server = http.createServer();

server.on('request', processrequest);
server.on('request', () => {
  console.log('DOING SOMETHING!');
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log('ready');
});

process.on('SIGINT', () => {
  console.log('SIGNINT');
  server.close();
});

server.on('connection', () => {
  console.log('connexion établie');
});

server.on('close', () => {
  console.log('le serveur est en arrêt');
  process.exit();
});
