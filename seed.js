const mysql = require('mysql2');
const config = require('./config.js')

// Create a MySQL connection pool
const pool = mysql.createPool(config.dbConfig);

// Function to execute SQL queries
function executeQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(query, values, (err, results) => {
                connection.release(); // Release the connection
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    });
}

// Define SQL queries for creating tables
const createTablesSQL = `
CREATE TABLE IF NOT EXISTS main_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sub_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    main_category_id INT,
    description TEXT,
    image VARCHAR(255),
    catcode VARCHAR(255),
    FOREIGN KEY (main_category_id) REFERENCES main_categories(id)
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    sub_category_id INT,
    image_url VARCHAR(255),
    CATCODE VARCHAR(255),
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id)
);

CREATE TABLE IF NOT EXISTS user_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    UNIQUE KEY unique_cart (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES user_details(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
`;

// Define SQL queries for inserting data as an array of individual statements
const insertDataSQLStatements = [
    // Insert statements for main_categories
    `INSERT INTO main_categories (name) VALUES ('Energy Meters');`,
    `INSERT INTO main_categories (name) VALUES ('Power Quality Analyzers');`,
    `INSERT INTO main_categories (name) VALUES ('Voltage Stabilizers');`,
    `INSERT INTO main_categories (name) VALUES ('Solar Inverters');`,

    // Insert statements for sub_categories
    `INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES ('DC Energy Meters', 1, 'Measuring DC energy consumption', 'dc_energy_meter.jpg', 'EM001');`,
    `INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES ('AC Energy Meters', 1, 'Measuring AC energy consumption', 'ac_energy_meter.jpg', 'EM002');`,
    `INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES ('Power Analyzers', 2, 'Analyzing power quality', 'power_analyzer.jpg', 'PA001');`,
    `INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES ('Voltage Analyzers', 3, 'Analyzing voltage quality', 'voltage_analyzer.jpg', 'PA002');`,
    `INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES ('Automatic Voltage Stabilizers', 4, 'Stabilizing AC voltage', 'voltage_stabilizer.jpg', 'VS001');`,
    `INSERT INTO sub_categories (name, main_category_id, description, image, catcode) VALUES ('Solar Grid-Tie Inverters', 2, 'Converting solar power to grid', 'solar_inverter.jpg', 'SI001');`,

    // Insert statements for products
    `INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ('DC Energy Meter Model A', 'High precision DC energy meter', 299.99, 1, 'dc_meter_model_a.jpg', 'EM001A');`,
    `INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ('AC Energy Meter Model X', 'Advanced AC energy meter', 399.99, 2, 'ac_meter_model_x.jpg', 'EM002X');`,
    `INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ('Power Analyzer Pro', 'Professional power quality analyzer', 899.99, 3, 'power_analyzer_pro.jpg', 'PA001A');`,
    `INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ('Voltage Analyzer Plus', 'Advanced voltage analyzer', 499.99, 4, 'voltage_analyzer_plus.jpg', 'PA002B');`,
    `INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ('Stabilizer Model S1', 'Single-phase voltage stabilizer', 199.99, 5, 'stabilizer_s1.jpg', 'VS001S');`,
    `INSERT INTO products (name, description, price, sub_category_id, image_url, CATCODE) VALUES ('Solar Inverter 5KW', '5KW grid-tie solar inverter', 1599.99, 6, 'solar_inverter_5kw.jpg', 'SI001B');`,

    // Add more individual INSERT statements for other tables as needed
];

// Function to create tables
async function createTables() {
    const sqlStatements = createTablesSQL.split(';').filter(statement => statement.trim() !== '');
    for (const sqlStatement of sqlStatements) {
        try {
            await executeQuery(sqlStatement);
        } catch (error) {
            console.error('Error creating table:', error);
        }
    }
}

// Function to insert data
async function insertData() {
    for (const sqlStatement of insertDataSQLStatements) {
        try {
            await executeQuery(sqlStatement);
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }
}

// Function to create tables and insert data
async function seedDatabase() {
    try {
        // Create tables
        await createTables();

        // Insert data
        await insertData();

        console.log('Seed script completed successfully.');
    } catch (error) {
        console.error('Error running seed script:', error);
    } finally {
        pool.end(); // Close the connection pool
    }
}

// Run the seed script
seedDatabase();
