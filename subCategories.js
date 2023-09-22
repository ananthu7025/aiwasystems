const express = require('express');
const db = require('./db'); 
const router = express.Router();


router.get('/', (req, res) => {
  db.query('SELECT * FROM sub_categories', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { name, mainCategoryId, description, image, catcode } = req.body;
  const sql = 'INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [name, mainCategoryId, description, image, catcode], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Subcategory created', id: result.insertId });
  });
});

router.get('/:subcategoryId', (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  const sql = 'SELECT * FROM sub_categories WHERE id = ?';
  
  db.query(sql, [subcategoryId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    res.json(results[0]);
  });
});

router.put('/:subcategoryId', (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  const { name, mainCategoryId, description, image, catcode } = req.body;
  const sql = 'UPDATE sub_categories SET name = ?, main_category_id = ?, description = ?, image = ?, catcode = ? WHERE id = ?';
  
  db.query(sql, [name, mainCategoryId, description, image, catcode, subcategoryId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Subcategory updated', id: subcategoryId });
  });
});

router.delete('/:subcategoryId', (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  const sql = 'DELETE FROM sub_categories WHERE id = ?';
  
  db.query(sql, [subcategoryId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Subcategory deleted', id: subcategoryId });
  });
});

module.exports = router;
