const { Pool, Client } = require('pg');
const dotenv = require('dotenv');

// const credentials = {
//   user: 'tim',
//   host: 'localhost',
//   database: 'sdc',
//   password: '',
//   port: 5432,
// };

//cloud connection
const { USER, HOST, DATABASE, PASSWORD, PORT } = process.env;

const credentials = {
  user: USER,
  host: HOST,
  database: DATABASE,
  password: '',
  port: PORT,
};

const pool = new Pool(credentials);
const client = new Client(credentials);

// console.time('now query')
// console.timeEnd('now query')

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.rows);
  }
})

module.exports = pool;