
\c sdc

COPY products(id, product_name, product_slogan, product_description, product_category, product_price)
FROM '/Users/tim/Documents/HackReactor/SDC-Questions-Answers/csvData/product.csv'
DELIMITER ','
CSV HEADER;

COPY questions(id, product_id, question_body, question_date, asker_name, question_email, question_reported, question_helpfulness)
FROM '/Users/tim/Documents/HackReactor/SDC-Questions-Answers/csvData/questions.csv'
DELIMITER ','
CSV HEADER;


COPY answers(id, question_id, answer_body, answer_date, answer_name, answer_email, answer_reported, answer_helpfulness)
FROM '/Users/tim/Documents/HackReactor/SDC-Questions-Answers/csvData/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, photos_url)
FROM '/Users/tim/Documents/HackReactor/SDC-Questions-Answers/csvData/answers_photos.csv' DELIMITER ','
CSV HEADER;