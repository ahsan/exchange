<div align="center">
    <img src="exchange.png" width="175">
</div>


Exchange is a simple API that can be used to convert currencies based on the rates published daily by the European Central Bank.

# Getting Started

1. [Install Docker](https://docs.docker.com/install/).
2. Install `docker-compose`. If you're on Mac or Windows, `docker-compose` comes bundled with `Docker` and you dont have to do anything else. If you're on Linux, visit the [official docs](https://docs.docker.com/compose/install/) for installation steps.
3. Populate the `.env` file with your choice of values. It comes with defaults that work out of the box. The `LOG_LEVEL` field accepts valid Winston log levels (silly, debug, verbose, info, warn and error). `RATE_UPDATE_CRON` takes a cron tab for the periodic updation of the currency rates. The default value of `1 16 * * *` queries the ECB API everyday at 4:01 PM (ECB publishes new rates everyday at 4:00 PM).
4. Run the application using `docker-compose`
```
docker-compose up --build
```
5. The app logs in the *app.log* file should say `App is now ready` when containers are done building and the app is in a running state.
5. Now the application should be accessible on the localhost with the port from the .env file. Check that the app is running by making GET requests on the endpoints described in the next section.
5. Stop the application by running
```
docker-compose down
```

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