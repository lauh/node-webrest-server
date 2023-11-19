import http from 'http';
import fs from 'fs';
const server = http.createServer((req, res) => {
  console.log(req.url);
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(`<h1>Hola Mundo!</h1><h2>${req.url}</h2>`);
  // res.end();

  // const data = {name: 'Juana Ruiz', age: 56, city: 'Madrid'};
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(data));


  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./src/public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
  }

  if (req.url?.endsWith('.css')) {
    const cssFile = fs.readFileSync('./src/public/css/styles.css', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.end(cssFile);
  } else if (req.url?.endsWith('.js')) {
    const cssFile = fs.readFileSync('./src/public/js/app.js', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(cssFile);
  }

  
});


server.listen(8080, () => {
  console.log('Server running on 8080');
});
