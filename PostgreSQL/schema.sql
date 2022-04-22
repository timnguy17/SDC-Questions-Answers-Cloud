-- -- --clear database on start up
DROP DATABASE IF EXISTS sdc;

-- --create db
CREATE DATABASE sdc;

-- --connect to db
\c sdc

--create table if it doesnt exists

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY NOT NULL,
  product_name VARCHAR(200),
  product_slogan VARCHAR(200),
  product_description TEXT,
  product_category VARCHAR(200),
  product_price INT
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  question_body VARCHAR(250) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(100) NOT NULL,
  question_email VARCHAR(100),
  question_reported BOOLEAN,
  question_helpfulness INT,
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INT NOT NULL,
  answer_body VARCHAR(250),
  answer_date BIGINT,
  answer_name VARCHAR(100),
  answer_email VARCHAR(100),
  answer_reported BOOLEAN,
  answer_helpfulness INT,
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY NOT NULL,
  answer_id INT NOT NULL,
  photos_url TEXT,
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);

-- ALTER TABLE answers ADD FOREIGN KEY ()
-- psql postgres < load.sql