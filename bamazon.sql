-- Drops the bazamzon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --

USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  -- Create column named "item_id"--
  -- Automatically give id increase by 1--
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  -- Not Null must have have a value 
  product_name VARCHAR(100) NOT NULL,
  -- Makes a boolean column called "department_name" which cannot contain null --
  department_name VARCHAR (50) NOT NULL,
  -- Makes a sting column called "price_customer" --
  price_customer FLOAT(5,2) NOT NULL, 
  -- Makes an numeric column called "stock_quantity" --
  stock_quantity INTEGER(10)NOT NULL,

  -- Primary key unique index in this database is the id
  PRIMARY KEY (item_id)
);

