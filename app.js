const express = require('express')
const app = express()
const logger = require('morgan')
const Tile38 = require('tile38')
const fs = require('fs')

const [_, __, t38host, t38port, t38username, t38password] = process.argv

const t38 = new Tile38({
  host: t38host || '127.0.0.1',
  port: parseInt(t38port || '9851'),
  debug: false
})

console.log('testing connection to tile 38')

t38
  .ping()
  .then(() => {
    console.log('connected to tile38')
    startExpress()
  })
  .catch(err => console.log(`error ${err}`))

app.use((req, res, next) => {
  req.t38 = t38
  next()
})

app.use(express.static('wwwroot'))
app.use(logger('dev'))

// require the whole ./api and ./routes directories
const requireDir = dir => {
  fs.readdirSync(dir)
    .forEach(file => {
      console.log(`using ${dir}/${file}`)
      app.use('/', require(`./${dir}/${file}`))
    })
}

requireDir('api')

function startExpress() {
  const port = process.env.PORT || 8080
  app.listen(port)
  console.log(`listening on port ${port}`)
}
