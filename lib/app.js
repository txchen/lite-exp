import express from 'express'
import serveIndex from 'serve-index'
import exp from './exp'
import expressBunyanLogger from 'express-bunyan-logger'

export default (config) => {
  const app = express()
  app.set('trust proxy', 'loopback')
  app.set('etag', false)

  app.use(expressBunyanLogger({
    parseUA: false,
    excludes: [
      'user-agent',
      'body',
      'short-body',
      'req-headers',
      'res-headers',
      'req',
      'res',
      'incoming',
      'response-hrtime',
    ],
  }))

  // check the cookie, if not available, let user enter credential

  // serve-index and serve-static, make it like nginx static serving
  app.use('/', serveIndex(config.rootDir, {
    'icons': true,
    'view': 'details',
  }))
  app.use(express.static(config.rootDir))

  // error handling, should be after normal middleware
  app.use((err, req, res, _next) => {
    res.status(err.statusCode || 500)
    if (err.statusCode === 500) {
      req.log.error(err)
    }
    const output = {
      reason: err.message,
    }
    if (process.env.NODE_ENV === 'dev') {
      output.stack = err.stack
    }
    res.json(output)
  })

  return app
}
