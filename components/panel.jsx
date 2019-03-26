const React = require('react')

module.exports = props => {
  if (props.children.length) {
    var body = props.children[0]
    var footer = <div className="card-footer clearfix">{props.children[1]}</div>
  } else {
    var body = props.children
    var footer = null
  }

  return (
    <div className={`card ${props.boxClass ? props.boxClass : ''}`}>
      <div className="card-header">{props.title}</div>
      <div className="card-body" style={props.noPadding ? { padding: 0 } : {}}>
        {body}
      </div>
      {footer}
    </div>
  )
}
