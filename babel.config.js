'use strict';

module.exports = {
  presets: ['@babel/preset-env'],
  env: {
    production: {
      presets: ['minify']
    }
  },
  comments: false,
};
