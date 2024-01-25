DROP DATABASE IF EXISTS mysql_first_day_db;

CREATE DATABASE mysql_first_day_db;

USE mysql_first_day_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY, -- this is what makes it indexed
    username VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    author VARCHAR(250) NOT NULL,
    release_date VARCHAR(250) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- or you could do SET NULL
);



INSERT INTO users(username, email, password) VALUES
    ('JS', 'JS@tes.com', 'pass'),
    ('JS2', 'JS@tes.com', 'pass'),
    ('JS3', 'JS@tes.com', 'pass');

INSERT INTO books (title, author, release_date, user_id) VALUES
    ('Jurassic Park', 'Michael Chricton', '1.1.89', 1),
    ('Dracula', 'Bram Stoker', '1.1.65', 1),
    ('I have a dream', 'Martin Luther King', '1.1.85', 3);


SELECT 
    users.id AS user_id,
    username,
    email,
    books.user_id AS books_id,
    title,
    author,
    release_date
    FROM users
    JOIN books ON (books.user_id = users.id);


-- SELECT * FROM users;