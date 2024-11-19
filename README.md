# arithmetic-calculator-frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
# API Documentation

## Endpoints

### 1. Addition
- **Path:** `/addition`
- **Method:** `POST`
- **Description:** Adds two numbers
- **Request Body:**
  ```json
  {
    "user_id": "id",
    "num1": 5,
    "num2": 3
  }
### 2. Subtraction
- **Path:** `/substraction`
- **Method:** `POST`
- **Description:** Subtracts two numbers.
- **Request Body:**
  ```json
  {
    "user_id": "id"
    "num1": 10,
    "num2": 4
  }
### 3. Soft Delete
- **Path:** `/soft-delete/{id}`
- **Method:** `PUT`
- **Description:** Soft-deletes a record by its ID
- **Path Parameters:** `id` (string): ID of the record to soft-delete

### 4.Division
- **Path:** `/division`
- **Method:** `POST`
- **Description:** Divides two numbers.
- **Request Body:**
  ```json
  {
    "user_id": "id"
    "num1": 10,
    "num2": 2
  }

### 5.Multiplication
- **Path:** `/multiplication`
- **Method:** `POST`
- **Description:** Multiplies two numbers.
- **Request Body:**
  ```json
  {
    "user_id": "id"
    "num1": 4,
    "num2": 6
  }

### 6.Random String
- **Path:** `/random-string`
- **Method:** `POST`
- **Description:** Generates a random string of specified length.
**Request Body:**
  ```json
  {
    "user_id": "id"
  }

### 7.Records
- **Path:** `/records`
- **Method:** `GET`
- **Description:** Retrieves a list of records.

### 8.Square Root
- **Path:** `/square-root`
- **Method:** `POST`
- **Description:** Calculates the square root of a number.
**Request Body:**
  ```json
  {
    "user_id": "id"
    "num": 16
  }

### 9.Initialize Balance
- **Path:** `trigered by aws cognito`
- **Method:** `POST`
- **Description:** Initializes the balance for a user when created to a 100.

### 10.Sign in, Sign Up and Sign out
- **Description:** Methods provided by AWS Cognito to manage users.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# calculator-front
