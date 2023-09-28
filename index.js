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

app.use(cors());
// app.use(express.json());

// app.use(bodyParser.json({ extended: true, limit: '50mb' }));
// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   parameterLimit: 100000,
//   extended: true 
// }));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

app.use('/main_categories', mainCategoriesRoutes);
app.use('/sub_categories', subCategoriesRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
const port =3030
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
