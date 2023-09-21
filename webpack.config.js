const path = require('path')

module.exports = {
  entry: {
    formSubmit: './src/unpacked/formSubmit_.js',
    tinySlider: './src/unpacked/tinySlider_.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  }
}