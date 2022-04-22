--clear database on start up
DROP DATABASE IF EXISTS sdc;
--create db
CREATE DATABASE sdc;
--connect to db
/CONNECT sdc;

--create table if it doesnt exists
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL --primary key
  product_id INT PRIMARY KEY(100) NOT NULL,
  question_id INT(100),
  asker_name VARCHAR(100),
  question_email VARCHAR(100),
  question_body VARCHAR(100),
  question_date DATE,
  question_helpfulness INT(100),
  question_reported BOOLEAN,
  answer_id
);

CREATE TABLE IF NOT EXISTS answers (
  answer_id INT PRIMARY KEY(100) NOT NULL,
  answer_name VARCHAR(100),
  answer_body VARCHAR(100),
  answer_email VARCHAR(100),
  answer_date DATE,
  answer_helpfulness INT(100),
  answer_reported BOOLEAN,
  photos_id INT(100)
    FOREIGN KEYREFERENCES
);

CREATE TABLE IF NOT EXISTS phots (
  photos_id INT PRIMARY KEY(100),
  photos_url TEXT
);



-- SELECT 'CREATE DATABASE sdc'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sdc')\gexec
