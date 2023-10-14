//index.js
const express = require('express');
const cors = require('cors');
// const { port } = require('./config');
const mainCategoriesRoutes = require('./mainCategories');
const subCategoriesRoutes = require('./subCategories');
const productsRoutes = require('./products');
const cartRoutes = require('./cart');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')
app.use(cors());

app.use(express.static('./public'));
app.use('/statics', express.static('./public'));
app.use(express.static(path.join(__dirname,'./public/publicWebsite/build')))
app.use(express.static(path.join(__dirname,'./public/admin/build')))

// app.use(express.static(path.join(__dirname, './public/admin/build', 'index.html')));
// app.use(express.static(path.join(__dirname, './public/publicWebsite/build', 'index.html')));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use('/api/main_categories', mainCategoriesRoutes);
app.use('/api/sub_categories', subCategoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);


// Handle GET requests to /api route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app

app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/admin/build', 'index.html'));
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/publicWebsite/build', 'index.html'));
})
const port = 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
