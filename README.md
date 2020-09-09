[![CircleCI](https://circleci.com/gh/serhatbolsu/api-test-javascript-jest-boilerplate.svg?style=svg)](https://circleci.com/gh/serhatbolsu/api-test-javascript-jest-boilerplate)
# API Testing Sample Framework with Javascript
Restful API testing sample framework. ATDD is the suggested design pattern with the help of resource-objects.
 
## Overview

This framework is designed to be boilerplate/sample for testing api's.
You will find test suites for included restful api "Vegetable" service and 
also for Emirates Flight Simulation Test Application. 
For the former example, there are three suites that are representing different design choices:
- Test suite using super agent.
- Test suite using base api which represent DSL of 'Vegetable' application.
- Test suite using Resource Objects, explained below.
- Test suite for data import from file.

for Flight Simulation app:
- Emirates Flight Simulation Test Suite with Resource Objects.

You can copy this library and use as you like, however think about the design choices you are changing.

| Technology | Description | 
| ---------- | ----------- |
| Acceptance Test Driven Development | ATDD involves team members with different perspectives (customer, development, testing) collaborating to write acceptance cases. |
| Resource Objects | Design pattern like Page Object, represent each endpoint as resource | 
| Code as commit | Everything about test automation should be committed, including CI | 

| Tools | Description |
| --- | --- |
| superagent | Request is a library for making HTTP requests. This will be used for making the HTTP requests in the tests |
| jest | Jest is a test executor that is running async. It includes assertion library. |
| eslint | Static code analysis tool for Javascript |
| husky | Regulate code commit (with linter in this case) |
| express | Express is popular HTTP framework for NodeJS which will be used for creating the System Under Test. |
| allure | Reporting tool, neat html report |

## Setup
Download or clone the project

First need to create your own configurations.
- change required variables

Copy the sample.env and rename to `.env`
- run install

```npm install```

## Test Suites and Example usage
These are example usages of library. From 1 to 3 abstraction of endpoints increases.
Also you will find Emirates - Flight Simulation App Test cases in `./test-flightapp` folder

#### 1- test/basic.spec.js
Directly using superagent to make http requests.
There are no helpers. Verification done with jest expect.

#### 2- test/basic_resource.spec.js
Uses a BaseAPi.js object as a wrapper around superagent.

**Benefit:**

- Wrap around common request parameters.
- Can implement authentication at this level.
- BaseURL is directly parsed from config.
- Can implement retry.
- superagent chain pattern can still be used.

#### 3-test/base_api_resource.spec.js
Uses resource object, this is a similar method used in selenium with **page Objects**

- Vegetable(endpoint resource) is converted to an object upon retrieval.
- in `vegetable.resource.js` you can write various methods with regards to this specific endpoint.
- re-usability increased with common vegetable endpoint functions.
- usage of superagent/requests encapsulated, however still usable look at tc#3.
- Pre-initialized resource-objects are singleton objects. So single object is shared inside test case.

#### 4- test-flightapp/flightapp.test.js
Uses flightapp.resource.js, this is a similar methodology used in web testing with **page objects**

- Flight Simulation App, create / get / getAll / delete / addPassenger endpoints are covered.
- API responses are converted to object/objects(flight) upon retrieval.
- in `flightapp.resource.js` you can write various methods with regards to this specific endpoint.
- re-usability increased with common flightapp endpoint functions.
- Pre-initialized resource-objects are singleton objects. So single object is shared inside test case.

## Familiarizing Yourself with the System Under Test
### Emirates Flight Simulation App
 please refer to [Flight Simulation Test App](https://confluence.emirates.com/display/IC/04.+Flight+Simulation+Test+App)
  confluence page, there you can also download postman collection.

In case you would like to run against app, set `BASE_URL` to given deployment url of app in `.env` file


### Vegetable App
It's always necessary to get to know the code you are testing. 
Let us examine the API that we are testing. The purpose of the API is to be an interface with a vegetable database. 
Supports the following operations:

- Adding a vegetable
- Deleting a vegetable
- Getting all vegetables

The API supports adding and deleting individual vegetables. You can also get all vegetables in the database. Here are the API routes:

* GET /vegetables
    * Description
        * Get all the vegetables in the database
    * Query Parameters
        * upperCase
            * If set to "true" the vegetable's name will be return uppercase
            * Default is false
        * optional
            * If set to "true", return will include optional: `origin`
            * Default is true

* POST /vegetables
    * Description
        * Add a vegetable to the database

* DELETE /vegetables/:id
    * Description
        * Delete a vegetable from the database
    * Url Parameters
        * name
            * The name of the vegetable to delete 

## Usage
In case you want to run against sample api *Vegetables*, 
run the server with in a separate terminal.

```npm start```

Run flight app tests in local

```npm run test.flightapp```

Run vegetable api tests in local

```npm test```

Run individual test suite

```jest ./test/basic.spec.js --json --outputFile=./testResults.json```

Allure Report
(you must have installed [allure command line](https://docs.qameta.io/allure/#_get_started))

```npm run report```

Post report to Microsoft Teams channel
```
# For Unix
export HOOK_URL=<microsoft_teams_webhook_url>
# For Windows Powershell
$env:HOOK_URL = '<microsoft_teams_webhook_url>'

npm run report.teams
```

## FAQ
### Use mocha or jest as test library
One reason is jest is chosen since it is sharing the same `expect` library with webdriverio. 
Secondly, It is much faster then mocha due to inherent parallelization.
