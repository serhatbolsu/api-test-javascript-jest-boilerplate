module.exports = async function() {
  console.log('afterAll is running');
  console.log(`global in teardown ${global.myVal}`);
};
