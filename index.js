const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const app = require('./app');

app.use('/', (req, res) => {
  res.end('Server listen');
});

app.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});
