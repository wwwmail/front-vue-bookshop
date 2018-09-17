'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const configs = {
  API: 'http://localhost:6003' // It's better to require a config file
}


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
