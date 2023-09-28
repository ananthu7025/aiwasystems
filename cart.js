// cart.js
const express = require('express');
const db = require('./db');
const router = express.Router();

// Route to submit user's carted items and details
router.post('/submit', (req, res) => {
  const { cartedItems, userDetails } = req.body;

  const { name, companyName, email, phone, city } = userDetails;

  // Validate mandatory fields
  if (!name || !phone) {
    return res.status(400).json({ error: 'Full Name and Phone Number are mandatory fields' });
  }

  // Insert user details into 'user_details' table and let the database auto-generate user_id
  const userDetailsSQL =
    'INSERT INTO user_details (name, company_name, email, phone, city) VALUES (?, ?, ?, ?, ?)';
  db.query(
    userDetailsSQL,
    [name, companyName, email, phone, city],
    (err, userDetailsResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const userId = userDetailsResult.insertId;

      // Insert carted items into 'user_cart' table with checks to avoid duplicate entries
      const userCartSQL =
        'INSERT INTO user_cart (user_id, product_id, quantity) VALUES (?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)';
      const cartItemsPromises = cartedItems.map((item) => {
        return new Promise((resolve, reject) => {
          db.query(userCartSQL, [userId, item.productId, item.quantity], (err, result) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      });

      Promise.all(cartItemsPromises)
        .then(() => {
          res.json({ message: 'Cart items and user details submitted successfully' });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        });
    }
  );
});
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
  
    // Query the database to retrieve the cart items and their corresponding product details
    const userCartSQL =
      'SELECT c.id AS cart_id, p.id AS product_id, p.name AS product_name, p.description AS product_description, ' +
      'p.price AS product_price, p.image_url AS product_image, c.quantity ' +
      'FROM user_cart c ' +
      'INNER JOIN products p ON c.product_id = p.id ' +
      'WHERE c.user_id = ?';
  
    db.query(userCartSQL, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Return the cart items and product details in JSON format
      res.json(results);
    });
  });
  router.get('/users', (req, res) => {
    // Query the database to retrieve all user details
    const allUsersSQL =
      'SELECT * FROM user_details';
  
    db.query(allUsersSQL, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Return the list of all users in JSON format
      res.json(results);
    });
  });
module.exports = router;
