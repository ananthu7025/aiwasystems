const express = require('express');
const db = require('./db'); 
const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM main_categories', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO main_categories (name) VALUES (?)';
  
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Category created', id: result.insertId });
  });
});

router.delete('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const sql = 'DELETE FROM main_categories WHERE id = ?';
  
  db.query(sql, [categoryId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Category deleted', id: categoryId });
  });
});

router.put('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;
  const sql = 'UPDATE main_categories SET name = ? WHERE id = ?';
  
  db.query(sql, [name, categoryId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Category updated', id: categoryId });
  });
});

module.exports = router;
