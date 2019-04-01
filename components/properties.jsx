const React = require('react')

const PropertyItem = props => {
  const { keyName, value } = props
  return (
    <tr>
      <td>{keyName}</td>
      <td>{value}</td>
    </tr>
  )
}

const Properties = props => {
  return (
    <table className="table table-striped">
      <tbody>
        {Object.keys(props.value).map(key => (
          <PropertyItem key={key} keyName={key} value={props.value[key]} />
        ))}
      </tbody>
    </table>
  )
}

module.exports = Properties
