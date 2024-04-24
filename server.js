const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

app.use('/', (req, res) => {
  res.end('Server listen');
});

app.listen(process.env.PORT, () => {
  console.log('Server listen in port 3000');
});
