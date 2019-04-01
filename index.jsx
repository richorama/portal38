const React = require('react')
const ReactDOM = require('react-dom')
const Page = require('./components/page.jsx')
const Panel = require('./components/panel.jsx')
const routie = require('./lib/routie')
const Server = require('./pages/server.jsx')
const Keys = require('./pages/keys.jsx')
const Key = require('./pages/key.jsx')
const Object = require('./pages/object.jsx')

const contentElement = document.getElementById('content')
function render(jsx) {
  ReactDOM.render(jsx, contentElement)
}

render(
  <Page>
    <Panel title="hello">
      <div>Hello World</div>
    </Panel>
  </Page>
)

routie('/server', () => {
  render(
    <Page activeMenuItem="#/server">
      <Server />
    </Page>
  )
})

routie('/keys', () => {
  render(
    <Page activeMenuItem="#/keys">
      <Keys />
    </Page>
  )
})

routie('/keys/:key', key => {
  render(
    <Page activeMenuItem="#/keys">
      <Key keyName={key} />
    </Page>
  )
})

routie('/object/:key/:id', (key, id) => {
  render(
    <Page activeMenuItem="#/keys">
      <Object keyName={key} id={id} />
    </Page>
  )
})

routie.reload()
