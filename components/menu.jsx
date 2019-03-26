const React = require('react')

const menuItems = [
  {
    href: '#/server',
    title: 'Server',
    icon: 'icon-speedometer'
  },
  {
    href: '#/keys',
    title: 'Keys',
    icon: 'icon-layers'
  }
]

const MenuItem = props => {
  return (
    <li className="nav-item">
      <a href={props.href} className={props.active ? 'active nav-link' : 'nav-link'}>
        <i className={`nav-icon ${props.icon}`} /> {props.title}
      </a>
    </li>
  )
}

const Menu = props => {
  return (
    <ul className="nav">
      {menuItems.map((x, index) => {
        const active = props.activeMenuItem === x.href
        return <MenuItem key={index} {...x} active={active} />
      })}
    </ul>
  )
}

module.exports = Menu