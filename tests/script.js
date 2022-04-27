import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '15s',
};

// export const options = {
//   stages: [
//     { duration: '30s', target: 100 },
//     { duration: '1m30s', target: 100 },
//     { duration: '20s', target: 50 },
//   ],
// };
let randomProduct = Math.floor(Math.random() * (1000011 - 1) + 1);
let randomQuestion = Math.floor(Math.random() * (3518963 - 1) + 1);

// export default function () {
//   http.get(`http://localhost:3000/qa/questions?product_id=${randomProduct}&page=1&count=100`);
//   sleep(1);

// }

export default function () {
  http.get(`http://localhost:3000/qa/questions/${randomQuestion}/answers?page=1&count=100`);
  sleep(1);
}


// export default function () {
//   const responses = http.batch([
//     ['GET', 'http://localhost:3000/qa/questions?product_id=1&page=1&count=100', null],
//     ['GET', 'http://localhost:3000/qa/questions?product_id=65560&page=1&count=100', null],
//     ['GET', 'http://localhost:3000/qa/questions?product_id=36512&page=2&count=2', null],
//   ]);

//   sleep(1);
// }