// Using ES6 because it's 2018.
require('@babel/register')({
  extends: './.babelrc',
  ignore: [/node_modules/]
})

module.exports = require('./src/server.js')
