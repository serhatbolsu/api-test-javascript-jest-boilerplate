// const superagent = require('superagent');
var defaults = require('superagent-defaults');
var superagent = defaults();

class BaseApi {
  constructor() {
    this.request = superagent;
    this.headers = {};
    this.baseUrl = 'http://localhost:3000';
  }

  // set get(url) {return this.request.get(url);};
  setHeaders(headers) {
    this.headers = headers;
    this.request.set(this.headers);
  }

  async get(url, headers={}, query={}, body={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    if (Object.keys(body).length !== 0) {
      return this.request.get(this.baseUrl + url)
          .send(body)
          .set(headers)
          .query(query);
    } else {
      return this.request.get(this.baseUrl + url)
          .send({})
          .set(headers)
          .query(query);
    }
  }

  async post(url, body={}, headers={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    return this.request.post(this.baseUrl + url)
        .send(body)
        .set(headers);
  }

  async put(url, body={}, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    return this.request.put(this.baseUrl + url)
        .send(body)
        .set(headers);
  }

  async patch(url, body={}, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    return this.request.patch(this.baseUrl + url)
        .send(body)
        .set(headers);
  }

  async delete(url, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    return this.request.delete(this.baseUrl + url)
        .set(headers);
  }
}

module.exports = BaseApi;
