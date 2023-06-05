const path = require('path')

module.exports = {
  entry: './src/formSubmit_.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'formSubmit.js'
  }
}