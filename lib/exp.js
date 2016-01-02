import express from 'express'
import awrap from 'awrap'

export default (config) => {
  const router = new express.Router()

  router.get('/', awrap(async (req, res) => {
    res.send('hello')
  }))

  return router
}
