const React = require('react')
const { Component, Fragment } = React
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')
const Tabs = require('../components/tabs.jsx')
const Properties = require('../components/properties.jsx')
const Map = require('../components/map.jsx')

const tabs = [
  {
    icon: 'icon-list',
    title: 'Properties'
  },
  {
    icon: 'icon-map',
    title: 'Map'
  },
  {
    icon: 'icon-note',
    title: 'JSON'
  }
]

const [OBJECT, MAP, JSONTAB] = tabs

const Key = class extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: null, activeTab: tabs[0], stats: null }

    this.handleGetResponse = this.handleGetResponse.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    http
      .get(`/api/get/${this.props.keyName}/${this.props.id}`)
      .then(this.handleGetResponse)
  }

  handleGetResponse(data) {
    this.setState({ data: data.object, loading: false })
  }

  handleClick(activeTab) {
    this.setState({ activeTab })
  }

  renderObject() {
    return <Properties value={this.state.data.properties} />
  }

  renderMap() {
    return <Map geoJson={this.state.data} />
  }

  renderJson() {
    return (
      <div className="bg-gray-100 rounded" style={{padding:25}}>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    )
  }

  renderBody() {
    switch (this.state.activeTab) {
      case OBJECT:
        return this.renderObject()
      case MAP:
        return this.renderMap()
      case JSONTAB:
        return this.renderJson()
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
