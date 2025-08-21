# API Documentation

This document provides an overview of the available API endpoints for the backend service. Please update with specific details as needed.

## Base URL
```
http://localhost:PORT/
```

## Endpoints

### Card Details
- `GET /card-details` - Get all card details
- `POST /card-details` - Create a new card detail
- `GET /card-details/:id` - Get card detail by ID
- `PUT /card-details/:id` - Update card detail by ID
- `DELETE /card-details/:id` - Delete card detail by ID

### Payments
- `GET /payments` - Get all payments
- `POST /payments` - Create a new payment
- `GET /payments/:id` - Get payment by ID
- `PUT /payments/:id` - Update payment by ID
- `DELETE /payments/:id` - Delete payment by ID

### Products
- `GET /products` - Get all products
- `POST /products` - Create a new product
- `GET /products/:id` - Get product by ID
- `PUT /products/:id` - Update product by ID
- `DELETE /products/:id` - Delete product by ID

### Stock
- `GET /stock` - Get all stock items
- `POST /stock` - Add new stock item
- `GET /stock/:id` - Get stock item by ID
- `PUT /stock/:id` - Update stock item by ID
- `DELETE /stock/:id` - Delete stock item by ID

### Suppliers
- `GET /suppliers` - Get all suppliers
- `POST /suppliers` - Create a new supplier
- `GET /suppliers/:id` - Get supplier by ID
- `PUT /suppliers/:id` - Update supplier by ID
- `DELETE /suppliers/:id` - Delete supplier by ID

### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## Authentication
Some endpoints may require authentication. Please refer to the authentication middleware for details.

## File Uploads
- `POST /uploads/batch` - Upload batch files
- `POST /uploads/users` - Upload user files

## Error Handling
All endpoints return standard HTTP status codes and error messages.

---
*This is a template. Please update with request/response examples and authentication details as needed.*
