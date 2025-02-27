const https = require('https');
const fs = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const options = {
    key: fs.readFileSync('./192.168.0.140-key.pem'), // путь к вашему ключу
    cert: fs.readFileSync('./192.168.0.140.pem'),    // путь к вашему сертификату
  };

  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on https://192.168.0.140:3000/');
  });
});