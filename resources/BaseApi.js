const defaults = require('superagent-defaults');
const superagent = defaults();

class BaseApi {
  constructor() {
    this.request = superagent;
    this.headers = {};
    this.baseUrl = global.baseUrl;
  }

  /**
   * Add new headers to existing headers
   * @param {object} headers
   */
  setAdditionalHeaders(headers) {
    this.headers = Object.assign(this.headers, headers);
    this.request.set(this.headers);
  }

  setAllureAttachment(res) {
    // TODO: Handle other types that allure report can show properly.
    try {
      if (Object.keys(res.body).length !== 0) {
        const contentType = res.headers['content-type']
            .includes('application/json') ? 'application/json' : 'txt';
        const obj = contentType === 'application/json' ? JSON.stringify(res.body) : res.body;
        reporter.addAttachment(res.req.path, obj, contentType);
      }
    } catch (error) {
      // ignore if allure is not set
    }
  }

  async get(url, headers={}, query={}, body={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    if (Object.keys(body).length !== 0) {
      const res = await this.request.get(this.baseUrl + url)
          .send(body)
          .set(headers)
          .query(query)
          .ok((res) => res.status <= 500);
      this.setAllureAttachment(res);
      return res;
    } else {
      const res = await this.request.get(this.baseUrl + url)
          .send({})
          .set(headers)
          .query(query)
          .ok((res) => res.status <= 500);
      this.setAllureAttachment(res);
      return res;
    }
  }

  async post(url, body={}, headers={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const res = await this.request.post(this.baseUrl + url)
        .send(body)
        .set(headers)
        .ok((res) => res.status <= 500);
    this.setAllureAttachment(res);
    return res;
  }

  async put(url, body={}, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const res = await this.request.put(this.baseUrl + url)
        .send(body)
        .set(headers)
        .ok((res) => res.status <= 500);
    this.setAllureAttachment(res);
    return res;
  }

  async patch(url, body={}, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const res = await this.request.patch(this.baseUrl + url)
        .send(body)
        .set(headers)
        .ok((res) => res.status <= 500);
    this.setAllureAttachment(res);
    return res;
  }

  async delete(url, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const res = await this.request.delete(this.baseUrl + url)
        .set(headers)
        .ok((res) => res.status <= 500);
    this.setAllureAttachment(res);
    return res;
  }
}

module.exports = BaseApi;
