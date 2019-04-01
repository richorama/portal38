const React = require('react')
const { Component, Fragment } = React
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')
const Tabs = require('../components/tabs.jsx')
const Properties = require('../components/properties.jsx')

const tabs = [
  {
    icon: 'icon-doc',
    title: 'Object'
  },
  {
    icon: 'icon-map',
    title: 'Map'
  }
]

const [OBJECT, MAP] = tabs

const Key = class extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: null, activeTab: tabs[0], stats: null }

    this.handleGetResponse = this.handleGetResponse.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    http.get(`/api/get/${this.props.keyName}/${this.props.id}`).then(this.handleGetResponse)
  }

  handleGetResponse(data) {
    this.setState({ data: data.object, loading: false })
  }

  handleClick(activeTab) {
    this.setState({ activeTab })
  }

  renderObject() {
    return (
      <Properties value={this.state.data.properties} />
    )
  }

  renderMap() {
    return <div>map</div>
  }

  renderBody() {
    switch (this.state.activeTab) {
      case OBJECT:
        return this.renderObject()
      case MAP:
        return this.renderMap()
    }
  }

  renderTabControl() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Fragment>
        <Tabs tabs={tabs} onClick={this.handleClick} pills={true} />
        <div style={{ marginTop: 25 }} />
        {this.renderBody()}
      </Fragment>
    )
  }
  render() {
    return <Panel title={this.props.keyName}>{this.renderTabControl()}</Panel>
  }
}

module.exports = Key
