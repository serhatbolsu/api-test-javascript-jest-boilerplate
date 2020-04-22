module.exports = async function() {
  console.log('beforeAll is running');
  global.myVal = '!!Value!!';
};
