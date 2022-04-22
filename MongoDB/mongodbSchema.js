const mongoose = require('mongoose');

//schema
let QASchema = new mongoose.Schema({
  "product_id": Number,
  "questions": [
    {
      "question_id": Number,
      "asker_name": String,
      "question_body": String,
      "question_date": Date,
      "question_email": String,
      "question_helpfulness": Number,
      "question_reported": Boolean,
      "answers": [
        {
          "id": Number,
          "body": String,
          "answer_name": String,
          "answer_email": String,
          "helpfulness": Number,
          "answer_reported": Boolean,
          "photos": "array"
        }
      ]
    }
  ]
});

//model
let QA = mongoose.model('QA', QASchema);

//drop collection on start
//QA.collection.drop