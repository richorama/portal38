const express = require('express')
const router = express.Router()

router.get('/api/keys', async (req, res) => {
  try {
    res.json(await req.t38.keys('*'))
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router