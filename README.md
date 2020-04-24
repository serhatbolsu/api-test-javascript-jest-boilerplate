# API Testing Sample Framework with Javascript

### Setup
First need to create your own configurations.
Copy the sample.env and rename to `.env`
- change required variables

```npm install```

- Run tests in local

```npm test```

In case you want to run against sample api *Vegetables*, 
run the server with

```npm start```

### Examples
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

- Used resource object, this is a similar method used in selenium with **page Objects**
- Vegetable(endpoint resource) is converted to an object upon retrieval
- in `vegetable.resource.js` you can write various methods with regards to this specific endpoint.
- re-usability increased with common vegetable endpoint functions.
- usage of superagent/requests encapsulated, however still usable look at tc#3

### ToDO
- Allure reporting
- Jenkinsfile
