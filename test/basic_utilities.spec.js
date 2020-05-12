// notice the usage of ES6 syntax. alternative import is below
import testData from '../data/testData';
// const testData = require('../data/testData');


describe('Utilities', function() {
  it('should get test data from file', function() {
    expect(testData).toHaveProperty('endPoint');
    expect(testData.specialProperty).toBe('password');
  });
});
