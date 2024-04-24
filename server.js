const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;

app.use('/', (req, res) => {
  res.end('Welcome');
});

app.listen(port, () => {
  console.log('Server listen in port 3000');
});
