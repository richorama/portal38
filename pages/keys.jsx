const React = require('react')
const Component = React.Component
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')

const Keys = class extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: null }

    this.handleServerResponse = this.handleServerResponse.bind(this)
  }

  componentDidMount() {
    http.get('/api/keys').then(this.handleServerResponse)
  }

  handleServerResponse(data) {
    this.setState({ data, loading: false })
  }

  renderItem(key) {
    return (
      <a key={key} href={`#/keys/${key}`} className="list-group-item list-group-item-action">
        {key}
      </a>
    )
  }

  renderBody() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div className="list-group">
        {this.state.data.map(x => this.renderItem(x))}
      </div>
    )
  }
  render() {
    return <Panel title="Keys">{this.renderBody()}</Panel>
  }
}

module.exports = Keys
