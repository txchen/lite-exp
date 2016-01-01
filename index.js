#!/usr/bin/env node
/* eslint-disable */

// entry point, do not use ES6 syntax here in this file, so that 'node' can launch this.
require('babel-register')({
  stage: 1,
  ignore: /lite-exp\/node_modules/
})

var program = require('commander')
var fs = require('fs')

function getConfig(configFile) {
  try {
    var configContent = fs.readFileSync(configFile).toString()
    var cfg = JSON.parse(configContent)
    // TODO: verify
    return cfg
  } catch (e) {
    console.error("Failed to parse " + configFile + " Error: " + e.message)
    process.exit(2)
  }
}

function main() {
  program.version('1.0.0')
    .option('-c, --config [config]', 'config file location')
  program.parse(process.argv)

  var cfg = getConfig(program.config)
  var server = require('./lib/app')(cfg)
  server.listen(config.port, config.host, function() {
    console.log('lite-exp listening on http://' + config.host + ':' + config.port)
  })
}

main()
