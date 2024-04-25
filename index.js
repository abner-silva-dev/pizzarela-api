const fs = require('node:fs');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//handler error syncronus
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const app = require('./app');

app.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});

// handler error asyncronus
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// (async () => {
//   const getPizzas = async (path) => {
//     try {
//       const data = await new Promise((resolve, reject) => {
//         fs.readFile(path, 'utf8', (err, data) => {
//           if (err) reject(err);
//           resolve(data);
//         });
//       });

//       return data;
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   };

//   try {
//     console.log(await getPizzas('./dev-data/pizza-data.json'));
//   } catch (error) {
//     console.error(error.message);
//   }
// })();
