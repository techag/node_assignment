# node_assignment
API using Node, Express, Mongoose (MongoDB) 

# Prerequisite
* Node JS installed
* MongoDB installed
* Postman 

# Instrunction to run the application
* Start MongoDB server and ensure it is running
* Open terminal window and go to project folder
* Run command ` npm start `
# API end points and Payload
***1. Create User***
* URI: ` /users/add`
* Method: ` POST`
* Payload Structure: 
```json
{
	"name": <STRING>,
	"phone": <STRING>,
	"address":<STRING>
}
```
**2. Get list of all Users**
* URI : ` /users`
* Method: ` GET`
* Sample Response: 
```json
[
    {
        "_id": "5e8f0f33bd107212997fcd44",
        "name": "Test User",
        "phone": "2342321341",
        "address": "This is test address",
        "latest_transaction_detail": [
            {
                "product_id": "2352353",
                "quantity": 12,
                "total_price": 42,
                "date": "2020-04-09T17:24:58.460Z"
            }
        ],
        "total_transactions": 3
    },
    {
        "_id": "5e8f0f6cbd107212997fcd46",
        "name": "Test User",
        "phone": "2342321331",
        "address": "This is test address",
        "latest_transaction_detail": [
            {
                "product_id": "2352353",
                "quantity": 12,
                "total_price": 42,
                "date": "2020-04-09T17:13:21.210Z"
            }
        ],
        "total_transactions": 2
    }
]
```
***3. Create Product***
* URI: ` /products/add`
* Method: ` POST`
* Payload Strucutre: 
```json
{
	"name": <STRING>,
	"unit_price": <NUM>,
	"description":<STRING>
}
```
***4. Get all products***
URI: ` /products`
Method: ` GET`
Sample Response: 
```json
{
    "sku": "3319",
    "created": "2020-04-08T20:15:17.598Z",
    "_id": "5e8e310d81f7001c13ed59ac",
    "name": "test",
    "description": "This is my first user",
    "__v": 0
}
```
***5. Post Transaction***
* URI: ` /transactions/add`
* Method: ` POST`
* Payload Structure: 
```json
{
	"product_id": <NUM>,
	"user_id": <STRING>,
	"quantity": <NUM>,
	"total_price":<NUM>
}
```
***6. Get all transactions***
* URI: ` /transactions` 
* Method: ` GET`
* Sample Response:
```json
[
    {
        "_id": "5e8f5771a29c4d201802019a",
        "product_id": "124123",
        "user_id": "5e8f0f33bd107212997fcd44",
        "quantity": 12,
        "total_price": 35,
        "date": "2020-04-09T17:12:17.990Z",
        "created": "2020-04-09T17:12:17.991Z",
        "__v": 0
    },
    {
        "_id": "5e8f5791a29c4d201802019b",
        "product_id": "12434123",
        "user_id": "5e8f0f33bd107212997fcd44",
        "quantity": 12,
        "total_price": 12,
        "date": "2020-04-09T17:12:49.721Z",
        "created": "2020-04-09T17:12:49.721Z",
        "__v": 0
    }
]
```
