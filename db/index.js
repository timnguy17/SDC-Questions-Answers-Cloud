const { Pool, Client } = require('pg');

// const credentials = {
//   user: 'tim',
//   host: 'localhost',
//   database: 'sdc',
//   password: '',
//   port: 5432,
// };

//cloud connection
const credentials = {
  user: 'ubuntu',
  host: "ec2-54-151-62-135.us-west-1.compute.amazonaws.com",
  database: 'sdc',
  password: '',
  port: 5432,
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