const express = require('express')
const router = express.Router()

router.get('/api/server', async (req, res) => {
  try {
    res.json(await req.t38.server())
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router