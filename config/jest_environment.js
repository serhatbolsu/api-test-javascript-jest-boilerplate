const NodeEnvironment = require('jest-environment-node');
require('dotenv').config();
const fs = require('fs');

class JestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.baseUrl = process.env.BASE_URL;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = JestEnvironment;
