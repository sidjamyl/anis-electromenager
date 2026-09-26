const http = require('http');
const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = Number(process.env.PORT || 3000);

app.prepare().then(() => http.createServer(handle).listen(port, '0.0.0.0', () => {
  console.log(`DZ Shopping ready on port ${port}`);
}));
