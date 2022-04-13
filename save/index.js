const express = require('express');
const mysql = require('mysql')
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

  // Establish a connection to the database
  let pool = mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    host: '127.0.0.1', // e.g. '127.0.0.1'
    port: '3306'
  });



app.post('/posts/save', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  try {
    const stmt = 'INSERT INTO posts (title, id) VALUES (?, ?)';
    // Pool.query automatically checks out, uses, and releases a connection
    // back into the pool, ensuring it is always returned successfully.
    await pool.query(stmt, [title, id]);
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    return res
      .status(500)
      .send(
        'Unable to successfully add post! Please check the application logs for more details.'
      )
      .end();
    // [END_EXCLUDE]
  }
  // [END cloud_sql_mysql_mysql_connection]

  res.status(200).send(`Successfully added post  ${title} with id ${id}`).end();
});




app.listen(4004, () => {
  console.log('v55');
  console.log('Listening on 4004');
});
