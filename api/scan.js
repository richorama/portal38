const express = require('express')
const router = express.Router()

router.get('/api/scan/:key', async (req, res) => {
  try {
    const query = req.t38
      .scanQuery(req.params.key)
      .limit(parseInt(req.query.limit || '100'))

    if (req.query.cursor) {
      query.cursor(parseInt(req.query.cursor))
    }
    res.json(await query.execute())
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
