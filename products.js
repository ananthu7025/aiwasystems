//products.js
const express = require('express');
const db = require('./db'); // Import the database connection
const router = express.Router();


router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, description, price, subCategoryId, imageUrl, CATCODE } = req.body;
  const sql = 'INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [name, description, price, subCategoryId, imageUrl, CATCODE], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product created', id: result.insertId });
  });
});

router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  const sql = 'SELECT * FROM products WHERE id = ?';
  
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(results[0]);
  });
});

router.put('/:productId', (req, res) => {
  const productId = req.params.productId;
  const { name, description, price, sub_category_id, imageUrl, CATCODE } = req.body;
  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, sub_category_id = ?, image_url = ?, CATCODE = ? WHERE id = ?';
  
  db.query(sql, [name, description, price, sub_category_id, imageUrl, CATCODE, productId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product updated', id: productId });
  });
});

router.delete('/:productId', (req, res) => {
  const productId = req.params.productId;
  const sql = 'DELETE FROM products WHERE id = ?';
  
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product deleted', id: productId });
  });
});
router.get('/subcategory/:subCategoryId', (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    const sql = 'SELECT * FROM products WHERE sub_category_id = ?';
    
    db.query(sql, [subCategoryId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      res.json(results);
    });
  });

module.exports = router;
