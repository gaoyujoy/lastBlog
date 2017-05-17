var register = require('babel-core/register');
require("babel-polyfill");

register({
    presets: ['es2015','stage-3']
});

require('./app_prod.js');