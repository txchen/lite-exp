import crypto from 'crypto'

function sha1sum(input) {
  return crypto.createHash('sha1').update(input).digest('hex')
}

export default (config) => (req, res, next) => {
  if (req.method === 'POST') {
    if (sha1sum(req.body.user) === config.user &&
        sha1sum(req.body.pass) === config.pass) {
      res.cookie('credhash', config.user + config.pass, { maxAge: 900000 })
      return res.redirect('/')
    }
  } else if (req.cookies.credhash) {
    if (req.cookies.credhash === config.user + config.pass) {
      return next()
    }
  }

  if (req.query.u && req.query.p) {
    if (sha1sum(req.query.u) === config.user &&
        sha1sum(req.query.p) === config.pass) {
      return next()
    }
  }
  // not good, render login form
  return res.render('login')
}
