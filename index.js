const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/index.js');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

//question list
app.get('/qa/questions', (req, res) => {
  const { product_id, page, count } = req.query;
  const offset = (page - 1) * count;
  db.query(`SELECT * FROM questions WHERE product_id = $1 LIMIT $2 OFFSET $3`, [product_id, count, offset], (err, result) => {
    if (err) {
      console.log('error', err)
    } else {
      // console.log(result.rows)
      // res.send(result.rows); -- CANT send more than once per query
      const questionIDs = result.rows.map((question) => { return question.id; });

      db.query(`SELECT * FROM answers WHERE question_id = ANY($1::int[])`, [questionIDs], (err, result2) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(result2)
          const answerIDs = result2.rows.map((answer) => { return answer.id; });

          db.query(`SELECT * FROM photos WHERE answer_id = ANY($1::int[])`, [answerIDs], (err, result3) => {
            if (err) {
              console.log('error', err)
            } else {
              const questions = result.rows.map((q) => {
                return {
                  "question_id": q.id,
                  "question_body": q.question_body,
                  "question_date": q.question_date,
                  "asker_name": q.asker_name,
                  "question_helpfulness": q.question_helpfulness,
                  "reported": q.eustion_reported,
                  "answers":
                    result2.rows.reduce((acc, val) => {
                      if (val.question_id === q.id) {
                        acc[val.id] = {
                          "id": val.id,
                          "body": val.answer_body,
                          "date": val.answer_date,
                          "answerer_name": val.answer_name,
                          "helpfulness": val.answer_helpfulness,
                          "photos":
                            result3.rows.map((photo) => {
                              return photo.photos_url
                            })
                        }
                      }
                      return acc;
                    }, {})
                }
              })
              res.send({
                "product_id": req.query.product_id,
                "results": questions
              });
            }
          })
        }
      })
    }
  })
});

//answer list
app.get('/qa/questions/:question_id/answers', (req, res) => {
  const { page, count } = req.query;
  const offset = (page - 1) * count;
  db.query(`SELECT * FROM answers WHERE question_id = $1 LIMIT $2 OFFSET $3`, [req.params.question_id, count, offset], (err, result) => {
    if (err) {
      console.log('error', err)
    } else {
      // console.log(result.rows)
      const answerIDs = result.rows.map((answer) => { return answer.id });

      db.query(`SELECT * FROM photos WHERE answer_id = ANY($1::int[])`, [answerIDs], (err, result2) => {
        if (err) {
          console.log('error', err);
        } else {
          const answers = result.rows.map((answer) => {
            return {
              "answer_id": answer.id,
              "body": answer.answer_body,
              "date": answer.answer_date,
              "answerer_name": answer.answer_name,
              "photos":
                result2.rows.map((photo) => {
                  return {
                    "id": photo.id,
                    "url": photo.photos_url
                  }
                })
            }
          })
          res.send({
            "question": req.params.question_id,
            "page": page,
            "count": count,
            "results": answers
          });
        }
      })
    }
  })
});


//add question
app.post('/qa/questions', (req, res) => {
  const { product_id, question_body, question_date, asker_name, question_email, question_reported, question_helpfulness } = req.body;
  db.query(
    `INSERT INTO questions(product_id, question_body, question_date, asker_name, question_email, question_reported, question_helpfulness)
     VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [product_id, question_body, question_date, asker_name, question_email, question_reported, question_helpfulness],
    (err, result) => {
      if (err) {
        console.log('body data', req.body)
        console.log('error', err)
      } else {
        console.log(result)
        res.send('successful question post')
      }
    })
})

//add answer
app.post('/qa/questions/:question_id/answers', (req, res) => {
  const { question_id, answer_body, answer_date, answer_name, answer_email, answer_reported, answer_helpfulness } = req.body;
  db.query(
    `INSERT INTO answers(question_id, answer_body, answer_date, answer_name, answer_email, answer_reported, answer_helpfulness)
     VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [question_id, answer_body, answer_date, answer_name, answer_email, answer_reported, answer_helpfulness],
    (err, result) => {
      if (err) {
        console.log('body data', req)
        console.log('error', err)
      } else {
        console.log(result)
        res.send('successful answer post')
      }
    })
})

//mark question as helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  db.query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE id = $1`, [req.params.question_id], (err, result) => {
    if (err) {
      console.log('error', err)
    } else {
      console.log('PUT marked question help')
      res.status(200).send('marked question as helpful')
    }
  })
})

//mark answer as helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  db.query(`UPDATE answers SET answer_helpfulness = answer_helpfulness + 1 WHERE id = $1`, [req.params.answer_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send('marked answer as helpful')
    }
  })
})

//report question
app.put('/qa/questions/:question_id/report', (req, res) => {
  db.query(`UPDATE questions SET questions_reported = 't' WHERE id = $1`, [req.params.question_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send('reported question')
    }
  })
})

//report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  db.query(`UPDATE answers SET answers_reported = 't' WHERE id = $1`, [req.params.answer_id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send('reported answer')
    }
  })
})


app.listen(PORT, () =>
  console.log(`The SDC is running on: http://localhost:${PORT}.`)
);