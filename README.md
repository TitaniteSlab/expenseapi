# Expense API

## Features implemented:

* Babel for async/await
* API is generated from an OpenAPI 3 schema using express-openapi
* Passport.js authentication middleware (required 2 strategies)
* Mongoose ODM (uses MongoDB, requires configuration in config/config.json)
* Mocha+Chai+Supertest tests (skeleton, not much implemented)
* Configuration separated from code (see config folder and config.js)
* Dockerfile with mountable config. Uses passenger-docker which gives us an nginx reverse proxy in front of our node server.
* Password encryption at rest (API key encryption still to do...)
* HTTP request logging (morgan)
* And more!

## To run in dev mode:

Set up a MongoDB server. The server address and database is configurable in config/config.json

npm install
npm run build && npm start

API endpoints will be available at http://localhost:8082/api/v1

For a list of endpoints, see openapi.yml.

## To build production docker image:

npm run build:docker

## To run tests:

npm test

## OpenAPI 3.0.2 schema (for import to Postman, etc) is hosted at:

http://localhost:8082/api/v1/spec

## Test data:

POST /api/v1/token
{
	"email": "test@example.com",
	"password": "Abc123"
}

POST /api/v1/expenses
{
    "description": "An example expense",
    "currency": "USD",
    "amount": 14.95
}