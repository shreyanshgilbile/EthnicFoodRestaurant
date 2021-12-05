# LemonTree Restaurant_Website
This is an Ethinic Food restaurant called Lemon Tree. This project is made my Shreyansh, Aradhita and Shivaji for our Web Programming Languages course

# Project Description:
1. Implemented a UI where a user can Sign up, Sign in, View menu, and Place orders for food items.
2. The user can also search for food items by any of the categories, price, name, and add them to their cart.
3. Also provided the admin functionalities where the administrator can log in with an authorized account and can insert, update, or delete the food items.

# Database Design:
These are the collections used in the project.                                                                             

# Users: 

This collection is used to store information about all the registered users. It consists of the following fields:
name: Stores the name of the user. 
email: Stores the email id of the user.
phnno: Stores the phone number of the user.
password: Stores the hashed password of the user. 
isAdmin: Stores boolean value to indicate whether a user is admin or not.
currentToken: Stores the current authentication token of the user if is logged in otherwise stores null. 

# Products: 

This collection is used to store information about all the products available in the restaurant. It consists of the following fields:
productName: Stores the name of the product.
description: Stores the description of the product.
category: Stores information about the category to which the product belongs.
price: Stores the price of the product.
qty: Stores the quantity of product available in the inventory. 
image: Stores the image of the product.
isDeleted: This field is used to implement soft-delete.  

# Orders:

This collection is used to store all the orders placed by the users. It consists of the following fields:
CustomerID: It is used to identify the user who placed the order.
Items: It consists of the array of information about the items placed as the order.
orderType: This field specifies whether the user wants to place the order for dine-in or pick-up.
bookingTime: stores the time at which order was placed.
totalBill: stores the total amount of the order.

# Languages/frameworks:
The following languages/frameworks were used in the project:

Front-end: HTML, CSS, JavaScript, React.js
Back-end: Node.js, Express.js
Database: MongoDB

# Dependencies:
1. You need to install node.js and npm.

2. Then navigate to main directory and run npm install to install backend dependencies.

3. Navigate to client directory and run npm install to install frontend dependencies.

