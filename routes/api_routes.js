const router = require('express').Router();

const db = require('../db/connections');




// localhost:3333/api/users
// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
  // const users = await db.query('SELECT * FROM users');

  try {
    const [users] = await db.query('SELECT * FROM users');

    responseObj.json(users);
  } catch (err) {
    console.log(err)
  }

});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
  // Get the old users array
  const userData = requestObj.body;
  try {
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username]);

    if (results.length) {
      return responseObj.json({
        error: 402,
        message: "Name already exists."
      })
    }
    const [result] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [userData.username, userData.email, userData.password]);

    responseObj.json({
      message: 'User Added successfully',
      insertId: result.insertId
    })
  } catch (err) {
    console.log(err)
  }
  //check if user already exists

  //query to insert new user 

});

// GET Route to return a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
  const user_id = requestObj.params.id;
  try {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [user_id])
    if (user.length) {
      return responseObj.json(user);
    }

    responseObj.json({
      error: 404,
      message: 'User not found with that'
    });
  } catch (err) {
    console.log(err);
  }
});

// GET rouyter to get the users and their associated books
router.get('/books', async (req, res) => {
  const sql = `
    SELECT 
      users.id AS user_id,
      username,
      email,
      books.user_id AS books_id,
      title,
      author,
      release_date
      FROM users
      JOIN books ON (books.user_id = users.id)
  `;

  try {
    const [books] = await db.query(sql);

    res.json(books);
  } catch(err){
    console.log(err)
  }
})

// GET single user and their books
router.get('/user/books', async (req, res) => {
  
  
  const sql = `
    SELECT 
      users.id AS user_id,
      username,
      email,
      books.user_id AS books_id,
      title,
      author,
      release_date
      FROM users
      JOIN books ON (books.user_id = users.id)
      WHERE user_id = ?
  `;

  try {
    const [books] = await db.query(sql, [req.query.user_id]);

    res.json(books);
  } catch(err){
    console.log(err)
  }
})

// DELETE Route to remove a user from the database
router.delete('/user/:id', async (requestObj, responseObj) => {
  // Get the user data
  // const users = await getUserData();
  const user_id = requestObj.params.id;

  try {
   await db.query('DELETE FROM users WHERE id = ?', [user_id])

    responseObj.json({
      error: 404,
      message: 'User Deleted'
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;