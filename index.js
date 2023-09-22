const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const mainCategoriesRoutes = require('./mainCategories');
const subCategoriesRoutes = require('./subCategories');
const productsRoutes = require('./products');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/main_categories', mainCategoriesRoutes);
app.use('/sub_categories', subCategoriesRoutes);
app.use('/products', productsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
