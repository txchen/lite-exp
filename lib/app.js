import express from 'express'
import serveIndex from 'serve-index'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import expressBunyanLogger from 'express-bunyan-logger'
import auth from './auth'

export default (config) => {
  const app = express()
  app.set('trust proxy', 'loopback')
  app.set('etag', false)
  app.set('view engine', 'ejs')

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

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))

  // check the cookie, if not available, let user enter credential
  app.use(auth(config))

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
