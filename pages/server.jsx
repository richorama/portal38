const React = require('react')
const Component = React.Component
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')
const Properties = require('../components/properties.jsx')

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

  renderBody() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Properties value={this.state.data} />
    )
  }
  render() {
    return <Panel title="Server Information">{this.renderBody()}</Panel>
  }
}

module.exports = Server
