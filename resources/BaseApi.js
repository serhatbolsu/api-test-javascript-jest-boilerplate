const defaults = require('superagent-defaults');
const logger = require('superagent-logger');
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

  setAllureAttachment({ req = {}, res = {} }) {
    try {
      if (Object.keys(req).length !== 0) {
        const reqObj = {
          header: req.header,
          query: req.qs,
          body: req._data,
        };
        reporter.addAttachment(`${req.method} request: ${req.url}`, JSON.stringify(reqObj), 'application/json');
      } else if (Object.keys(res).length !== 0 ) {
        const contentType = res.headers['content-type']
            .includes('application/json') ? 'application/json' : 'text/html';
        const obj = contentType === 'application/json' ? JSON.stringify(res.body) : res.text;
        reporter.addAttachment(`${res.req.method} response: ${res.req.path} STATUS: ${res.status}`, obj, contentType);
      }
    } catch (error) {
      // ignore if allure is not set
    }
  }

  async get(url, headers={}, query={}, body={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const req = this.request.get(this.baseUrl + url)
        .use(logger)
        .send({})
        .set(headers)
        .query(query)
        .ok((response) => response.status <= 500);
    if (Object.keys(body).length !== 0) {
      req.send(body);
    }
    this.setAllureAttachment({ req: req });
    const res = await req;
    this.setAllureAttachment({ res: res });
    return res;
  }

  async post(url, body={}, headers={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const req = this.request.post(this.baseUrl + url)
        .use(logger)
        .send(body)
        .set(headers)
        .ok((response) => response.status <= 500);
    this.setAllureAttachment({ req: req });
    const res = await req;
    this.setAllureAttachment({ res: res });
    return res;
  }

  async put(url, body={}, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const req = this.request.put(this.baseUrl + url)
        .use(logger)
        .send(body)
        .set(headers)
        .ok((response) => response.status <= 500);
    this.setAllureAttachment({ req: req });
    const res = await req;
    this.setAllureAttachment({ res: res });
    return res;
  }

  async patch(url, body={}, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const req = this.request.patch(this.baseUrl + url)
        .use(logger)
        .send(body)
        .set(headers)
        .ok((response) => response.status <= 500);
    this.setAllureAttachment({ req: req });
    const res = await req;
    this.setAllureAttachment({ res: res });
    return res;
  }

  async delete(url, headers ={}) {
    url = url.startsWith('/') ? url : `/${url}`;
    const req = this.request.delete(this.baseUrl + url)
        .use(logger)
        .set(headers)
        .ok((response) => response.status <= 500);
    this.setAllureAttachment({ req: req });
    const res = await req;
    this.setAllureAttachment({ res: res });
    return res;
  }
}

module.exports = BaseApi;
