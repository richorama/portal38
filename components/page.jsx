const React = require('react')
const Fragment = React.Fragment
const Menu = require('./menu.jsx')

const Page = props => {
  return (
    <Fragment>
      <section className="sidebar">
        <div id="menu">
          <Menu activeMenuItem={props.activeMenuItem} />
        </div>
      </section>

      <main className="main">
        <div className="content-wrapper">
          <section className="content">
            <div style={{ padding: 25 }}>{props.children}</div>
          </section>
        </div>
      </main>
    </Fragment>
  )
}

module.exports = Page