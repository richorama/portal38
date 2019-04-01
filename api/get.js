const express = require('express')
const router = express.Router()

router.get('/api/get/:key/:id', async (req, res, next) => {
  try {
    res.json(await req.t38.get(req.params.key, req.params.id))
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router