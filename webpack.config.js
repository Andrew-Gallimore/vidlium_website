const path = require('path')

module.exports = {
  entry: {
    formSubmit: './src/formSubmit_.js',
    tinySlider: './src/tinySlider_.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  }
}