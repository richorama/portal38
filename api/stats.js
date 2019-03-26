const express = require('express')
const router = express.Router()

router.get('/api/stats/:key', async (req, res) => {
  try {
    res.json(await req.t38.stats(req.params.key))
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router