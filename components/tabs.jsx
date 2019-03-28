const React = require('react')

const Tab = props => {
  return (
    <li className="nav-item">
      <a
        href="javascript:void(0);"
        className={props.active ? 'nav-link active' : 'nav-link'}
        onClick={props.onClick.bind(null, props.index)}
      >
        <i className={props.icon} /> {props.title}
      </a>
    </li>
  )
}

const Tabs = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(index) {
    this.setState({ active: index })
    if (this.props.onClick) this.props.onClick(this.props.tabs[index])
  }

  render() {
    return (
      <ul className={this.props.pills ? 'nav nav-pills' : 'nav nav-tabs'}>
        {this.props.tabs.map((tab, index) => (
          <Tab
            key={index}
            {...tab}
            active={this.state.active === index}
            onClick={this.handleClick}
            index={index}
          />
        ))}
      </ul>
    )
  }
}

module.exports = Tabs
