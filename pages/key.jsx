const React = require('react')
const Component = React.Component
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')

const Key = class extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: null }

    this.handleServerResponse = this.handleServerResponse.bind(this)
  }

  componentDidMount() {
    http.get(`/api/scan/${this.props.keyName}`).then(this.handleServerResponse)
  }

  handleServerResponse(data) {
    this.setState({ data, loading: false })
  }

  renderItem(item) {
    return (
      <a key={item.id} href={`#/item/${item.id}`} className="list-group-item list-group-item-action">
        {item.id}
      </a>
    )
  }

  renderBody() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <div className="list-group">
        {this.state.data.objects.map(x => this.renderItem(x))}
      </div>
    )
  }
  render() {
    return <Panel title={this.props.keyName}>{this.renderBody()}</Panel>
  }
}

module.exports = Key
