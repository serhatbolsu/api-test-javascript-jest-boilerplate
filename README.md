[![CircleCI](https://circleci.com/gh/serhatbolsu/api-test-javascript-jest-boilerplate.svg?style=svg)](https://circleci.com/gh/serhatbolsu/api-test-javascript-jest-boilerplate)
# API Testing Sample Framework with Javascript
Restful API testing sample framework. ATDD is the suggested design pattern with the help of resouce-objects.

> Jest is chosen since it is sharing the same `expect` library with webdriverio. 
> It is much faster then mocha due to inherent parallelization. 


## Overview

In this framework, you will find test suites for included restful api "Vegetable" service. 
You will find three suites that are representing different design choices
- Test suite using super agent.
- Test suite using base api which represent DSL of 'Vegetable' application.
- Test suite using Resource Objects, explained below.
- Test suite for data import from file.

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
First need to create your own configurations.

Copy the sample.env and rename to `.env`
- change required variables

```npm install```

In case you want to run against sample api *Vegetables*, 
run the server with

```npm start```


## Test Suites and Example usage
These are example usages of library. From 1 to 3 abstraction of endpoints increases.

#### 1- basic.spec.js
Directly using superagent to make http requests.
There are no helpers. Verification done with jest expect.

#### 2- basic_resource.spec.js
Uses a BaseAPi.js object as a wrapper around superagent.

**Benefit:**

- Wrap around common request parameters
- Can implement authentication at this level.
- BaseURL is directly parsed from config
- Can implement retry
- superagent chain pattern can still be used

#### 3-base_api_resource.spec.js
Uses resource object, this is a similar method used in selenium with **page Objects**

- Vegetable(endpoint resource) is converted to an object upon retrieval
- in `vegetable.resource.js` you can write various methods with regards to this specific endpoint.
- re-usability increased with common vegetable endpoint functions.
- usage of superagent/requests encapsulated, however still usable look at tc#3
- Pre-initialized resource-objects are singleton objects. So single object is shared inside test case.


## Familiarizing Yourself with the System Under Test

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
Run tests in local

```npm test```

Run individual test suite

```npm test -- test/basic.spec.js```

Allure Report
(you must have installed [allure command line](https://docs.qameta.io/allure/#_get_started))

```npm run report```

Post report to Microsoft Teams channel
```
export HOOK_URL=<microsoft_web_hook_url>
npm run report.teams

```

## Contributors
Special thanks to [gsypolt](https://github.com/gsypolt/api-testing-javascript) as he is the owner of vegetable api.

Please create a pull request.


## ToDO

- Jenkinsfile
- Slack Reporter (looking for help, send a PR if you are interested)
