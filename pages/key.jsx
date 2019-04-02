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
    icon: 'icon-docs',
    title: 'Objects'
  },
  {
    icon: 'icon-map',
    title: 'Map'
  },
  {
    icon: 'icon-speedometer',
    title: 'Stats'
  }
]

const [OBJECTS, MAP, STATS] = tabs

const Key = class extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, data: null, activeTab: tabs[0], stats: null }

    this.handleScanResponse = this.handleScanResponse.bind(this)
    this.handleStatsResponse = this.handleStatsResponse.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    http.get(`/api/scan/${this.props.keyName}`).then(this.handleScanResponse)
  }

  handleScanResponse(data) {
    this.setState({ data, loading: false })
  }

  handleClick(activeTab) {
    this.setState({ activeTab })
    if (activeTab === STATS) {
      http
        .get(`/api/stats/${this.props.keyName}`)
        .then(this.handleStatsResponse)
    }
  }

  handleStatsResponse(data) {
    this.setState({ stats: data[0] })
  }

  renderItem(item) {
    return (
      <a
        key={item.id}
        href={`#/object/${this.props.keyName}/${item.id}`}
        className="list-group-item list-group-item-action"
      >
        {item.id}
      </a>
    )
  }

  renderList() {
    return (
      <div className="list-group">
        {this.state.data.objects.map(x => this.renderItem(x))}
      </div>
    )
  }

  renderMap() {
    return <Map geoJson={{type:"FeatureCollection", features: this.state.data.objects.map(x => x.object)}} />
  }

  renderStats() {
    if (!this.state.stats){
      return <Loading/>
    }
    return (
      <Properties value={this.state.stats} />
    )
  }

  renderBody() {
    switch (this.state.activeTab) {
      case OBJECTS:
        return this.renderList()
      case MAP:
        return this.renderMap()
      case STATS:
        return this.renderStats()
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
