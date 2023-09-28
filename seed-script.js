// seed-script.js
function seedScript(connection) {
  // Sample data for main categories
  const mainCategoriesData = [
    { name: 'Energy Meters' },
    { name: 'Power Quality Analyzers' },
    { name: 'Voltage Stabilizers' },
    { name: 'Solar Inverters' },
    // Add more main categories as needed
  ];

  // Sample data for subcategories
  const subCategoriesData = [
    {
      name: 'DC Energy Meters',
      main_category_id: 24,
      description: 'Measuring, DC energy, consumption',
      image: 'dc_energy_meter.jpg',
      catcode: 'EM001'
    },
    {
      name: 'AC Energy Meters',
      main_category_id: 24,
      description: 'Measuring, AC energy, consumption',
      image: 'ac_energy_meter.jpg',
      catcode: 'EM002'
    },
    {
      name: 'Power Analyzers',
      main_category_id: 25,
      description: 'Analyzing, power quality',
      image: 'power_analyzer.jpg',
      catcode: 'PA001'
    },
    {
      name: 'Voltage Analyzers',
      main_category_id: 26,
      description: 'Analyzing, voltage quality',
      image: 'voltage_analyzer.jpg',
      catcode: 'PA002'
    },
    {
      name: 'Automatic Voltage Stabilizers',
      main_category_id: 27,
      description: 'Stabilizing, AC voltage',
      image: 'voltage_stabilizer.jpg',
      catcode: 'VS001'
    },
    {
      name: 'Solar Grid-Tie Inverters',
      main_category_id: 25,
      description: 'Converting, solar power to grid',
      image: 'solar_inverter.jpg',
      catcode: 'SI001'
    },
    // Add more subcategories as needed
  ];

  // Sample data for products
  const productsData = [
    { name: 'DC Energy Meter Model A', description: 'High precision DC energy meter', price: 299.99, sub_category_id: 68, image_url: 'dc_meter_model_a.jpg', CATCODE: 'EM001A' },
    { name: 'AC Energy Meter Model X', description: 'Advanced AC energy meter', price: 399.99, sub_category_id: 69, image_url: 'ac_meter_model_x.jpg', CATCODE: 'EM002X' },
    { name: 'Power Analyzer Pro', description: 'Professional power quality analyzer', price: 899.99, sub_category_id: 70, image_url: 'power_analyzer_pro.jpg', CATCODE: 'PA001A' },
    { name: 'Voltage Analyzer Plus', description: 'Advanced voltage analyzer', price: 499.99, sub_category_id: 68, image_url: 'voltage_analyzer_plus.jpg', CATCODE: 'PA002B' },
    { name: 'Stabilizer Model S1', description: 'Single-phase voltage stabilizer', price: 199.99, sub_category_id: 68, image_url: 'stabilizer_s1.jpg', CATCODE: 'VS001S' },
    { name: 'Solar Inverter 5KW', description: '5KW grid-tie solar inverter', price: 1599.99, sub_category_id: 69, image_url: 'solar_inverter_5kw.jpg', CATCODE: 'SI001B' },
    // Add more products as needed
  ];

  connection.query('INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ?', [productsData.map(item => [item.name, item.description, item.price, item.sub_category_id, item.image_url, item.CATCODE])], (err, results) => {
    if (err) throw err;
  });
}

module.exports = seedScript;
