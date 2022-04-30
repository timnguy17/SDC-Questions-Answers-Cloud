const { Pool, Client } = require('pg');
require('dotenv').config();


// const credentials = {
//   user: 'tim',
//   host: 'localhost',
//   database: 'sdc',
//   password: '',
//   port: 5432,
// };

//cloud connection

const credentials = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
};

const pool = new Pool(credentials);
const client = new Client(credentials);

// console.time('now query')
// console.timeEnd('now query')

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res.rows);
//   }
// })

module.exports = pool;
