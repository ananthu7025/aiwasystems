API Documentation


Base URL The base URL for all API endpoints is:

<http://localhost:4000/>

Error Handling In case of an error, the API will respond with an error message in JSON format. Common error codes include:

400 Bad Request: The request is malformed or missing required parameters. 401 Unauthorized: Authentication failed or user doesn't have access. 404 Not Found: The requested resource does not exist. 500 Internal Server Error: An unexpected error occurred on the server.

Endpoints

Main Categories

Get All Main Categories Endpoint: /main_categories Method: GET Description: Get a list of all main categories. Parameters: None Response: 200 OK: Returns a JSON array of main categories. 500 Internal Server Error: If there is a server-side issue.

Create Main Category Endpoint: /main_categories Method: POST Description: Create a new main category. Parameters: name (string, required): The name of the main category. Response: 201 Created: Returns a JSON object confirming the creation of the main category. 400 Bad Request: If the request is missing the name parameter. 500 Internal Server Error: If there is a server-side issue.

Update Main Category Endpoint: /main_categories/:categoryId Method: PUT Description: Update an existing main category. Parameters: categoryId (integer, required): The ID of the main category to update. name (string, required): The updated name of the main category. Response: 200 OK: Returns a JSON object confirming the update of the main category. 400 Bad Request: If the request is missing required parameters. 404 Not Found: If the specified main category does not exist. 500 Internal Server Error: If there is a server-side issue.

Delete Main Category Endpoint: /main_categories/:categoryId Method: DELETE Description: Delete an existing main category. Parameters: categoryId (integer, required): The ID of the main category to delete. Response: 200 OK: Returns a JSON object confirming the deletion of the main category. 404 Not Found: If the specified main category does not exist. 500 Internal Server Error: If there is a server-side issue.

Sub Categories Get All Sub Categories Endpoint: /sub_categories Method: GET Description: Get a list of all sub categories. Parameters: None Response: 200 OK: Returns a JSON array of sub categories. 500 Internal Server Error: If there is a server-side issue.

Create Sub Category Endpoint: /sub_categories Method: POST Description: Create a new sub category. Parameters: name (string, required): The name of the sub category. mainCategoryId (integer, required): The ID of the main category to which this sub category belongs. description (string, optional): A description of the sub category. image (string, optional): URL or path to an image representing the sub category. catcode (string, optional): A unique code for the sub category. Response: 201 Created: Returns a JSON object confirming the creation of the sub category. 400 Bad Request: If the request is missing required parameters. 500 Internal Server Error: If there is a server-side issue.

Update Sub Category Endpoint: /sub_categories/:subcategoryId Method: PUT Description: Update an existing sub category. Parameters: subcategoryId (integer, required): The ID of the sub category to update. name (string, required): The updated name of the sub category. mainCategoryId (integer, required): The updated main category ID. description (string, optional): The updated description of the sub category. image (string, optional): The updated URL or path to an image representing the sub category. catcode (string, optional): The updated unique code for the sub category. Response: 200 OK: Returns a JSON object confirming the update of the sub category. 400 Bad Request: If the request is missing required parameters. 404 Not Found: If the specified sub category does not exist. 500 Internal Server Error: If there is a server-side issue.

Delete Sub Category Endpoint: /sub_categories/:subcategoryId Method: DELETE Description: Delete an existing sub category. Parameters: subcategoryId (integer, required): The ID of the sub category to delete. Response: 200 OK: Returns a JSON object confirming the deletion of the sub category. 404 Not Found: If the specified sub category does not exist. 500 Internal Server Error: If there is a server-side issue.

Products Get All Products Endpoint: /products Method: GET Description: Get a list of all products. Parameters: None Response: 200 OK: Returns a JSON array of products. 500 Internal Server Error: If there is a server-side issue.

Create Product Endpoint: /products Method: POST Description: Create a new product. Parameters: name (string, required): The name of the product. description (string, optional): A description of the product. price (number, required): The price of the product. subCategoryId (integer, required): The ID of the sub category to which this product belongs. imageUrl (string, optional): URL or path to an image representing the product. CATCODE (string, optional): A unique code for the product. Response: 201 Created: Returns a JSON object confirming the creation of the product. 400 Bad Request: If the request is missing required parameters. 500 Internal Server Error: If there is a server-side issue.

Get Product by ID Endpoint: /products/:productId Method: GET Description: Get detailed information about a specific product. Parameters: productId (integer, required): The ID of the product to retrieve. Response: 200 OK: Returns a JSON object representing the product. 404 Not Found: If the specified product does not exist. 500 Internal Server Error: If there is a server-side issue.

Update Product Endpoint: /products/:productId Method: PUT Description: Update an existing product. Parameters: productId (integer, required): The ID of the product to update. name (string, required): The updated name of the product. description (string, optional): The updated description of the product. price (number, required): The updated price of the product. subCategoryId (integer, required): The updated sub category ID. imageUrl (string, optional): The updated URL or path to an image representing the product. CATCODE (string, optional): The updated unique code for the product. Response: 200 OK: Returns a JSON object confirming the update of the product. 400 Bad Request: If the request is missing required parameters. 404 Not Found: If the specified product does not exist. 500 Internal Server Error: If there is a server-side issue.

Delete Product Endpoint: /products/:productId Method: DELETE Description: Delete an existing product. Parameters: productId (integer, required): The ID of the product to delete. Response: 200 OK: Returns a JSON object confirming the deletion of the product. 404 Not Found: If the specified product does not exist. 500 Internal Server Error: If there is a server-side issue.

Get Products by Sub Category Endpoint: /products/subcategory/:subCategoryId Method: GET Description: Get a list of products belonging to a specific sub category. Parameters: subCategoryId (integer, required): The ID of the sub category. Response: 200 OK: Returns a JSON array of products in the specified sub category. 404 Not Found: If the specified sub category does not exist. 500 Internal Server Error: If there is a server-side issue.
https://stackoverflow.com/questions/63552490/deploy-reactjs-mysql-nodejs-express-project