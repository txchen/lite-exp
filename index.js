#!/usr/bin/env node
/* eslint-disable */

// entry point, do not use ES6 syntax here in this file, so that 'node' can launch this.
require('babel-polyfill')
require('babel-register')({
  presets: ['es2015', 'stage-0'],
  ignore: /lite-exp\/node_modules/
})

var program = require('commander')
var fs = require('fs')

function getConfig(configFile) {
  try {
    var configContent = fs.readFileSync(configFile).toString()
    var cfg = JSON.parse(configContent)
    cfg.host = cfg.host || '127.0.0.1'
    cfg.port = cfg.port || 22222
    if (!cfg.rootDir) {
      throw new Error('Must specify rootDir')
    }
    return cfg
  } catch (e) {
    console.error('Failed to parse ' + configFile + ' Error: ' + e.message)
    process.exit(2)
  }
}

function main() {
  program.version('1.0.0')
    .option('-c, --config [config]', 'config file location')
    .parse(process.argv)

  if (!program.config) {
    program.outputHelp()
    process.exit(1)
  }

  var cfg = getConfig(program.config)
  var server = require('./lib/app').default(cfg)
  server.listen(cfg.port, cfg.host, function() {
    console.log('lite-exp listening on http://' + cfg.host + ':' + cfg.port)
  })
}

main()
