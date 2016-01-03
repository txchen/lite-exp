import express from 'express'
import awrap from 'awrap'

export default (config) => {
  const router = new express.Router()

  // a catch-all router
  router.get('/*', awrap(async (req, res) => {
    res.send(config.rootDir)
//    res.send(req.url)
  }))

  return router
}
