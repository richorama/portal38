const React = require('react')
const Component = React.Component
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')

const Server = class extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: null }

    this.handleServerResponse = this.handleServerResponse.bind(this)
  }

  componentDidMount() {
    http.get('/api/server').then(this.handleServerResponse)
  }

  handleServerResponse(data) {
    this.setState({ data, loading: false })
  }

  renderItem(key, value) {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    )
  }

  renderBody() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <table className="table">
        <tbody>{Object.keys(this.state.data).map(key => this.renderItem(key, this.state.data[key]))}</tbody>
      </table>
    )
  }
  render() {
    return <Panel title="Server Information">{this.renderBody()}</Panel>
  }
}

module.exports = Server
