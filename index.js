import express from 'express';
import bodyParser from 'body-parser';

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.listen(PORT, () =>
console.log(`The SDC is running on: http://localhost:${PORT}.`)
)

app.get('/', (req, res) => {
  res.send('Welcome to the SDC project!');
})

app.post('/', (req, res) => {
  res.send('POST request completed');
})


//Q&A