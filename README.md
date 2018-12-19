<div align="center">
    <img src="exchange.png" width="175">
</div>


Exchange is a simple API that can be used to convert currencies based on the rates published daily by the European Central Bank.

# Endpoints

The complete library of endpoints can be found on postman [here](https://www.getpostman.com/collections/aeb591736835b4d38c46).

## 1. Healthcheck
This application has a healthcheck endpoint:
```
GET /v1/ping
```
Response for requests on this endpoint includes a text message and the current server time.

Example:
```
{
    "message": "pong",
    "time": "Tue Jan 01 2000 12:12:12 GMT+0500 (PKT)"
}
```

## 2. Exchange
This endpoint can be used to convert an amount from a source currency to a target currency. There are three query parameters which are all required. The query params are:

|Parameter|Description|
|---|---|
|amount|The amout in source currency|
|from|ISO 4217 Code for the source currency|
|tp|ISO 4217 Code for the target currency|

Example:
```
GET /v1/exchange?amount=100&to=USD&from=EUR

{
    "message": {
        "amount": 113.77,
        "text": "100 EUR = 113.77 USD",
        "rate": "1 EUR = 1.1377 USD",
        "rateValue": 1.1377
    },
    "time": "Tue Jan 01 2000 12:12:12 GMT+0500 (PKT)"
}
```

# Database
The application logs all of the incoming exchange requests to MongoDB. The collections is named *transactions*.

**Get count of total transactions in the DB**
```
mongo
use exchange
db.transactions.find().count()
```

**See all transactions**
```
mongo
use exchange
db.transactions.find().pretty()
```