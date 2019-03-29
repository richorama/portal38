const React = require('react')
const { Component, Fragment } = React
const Panel = require('../components/panel.jsx')
const Loading = require('../components/loading.jsx')
const http = require('../lib/http')
const Tabs = require('../components/tabs.jsx')

const tabs = [
  {
    icon: 'icon-docs',
    title: 'Items'
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

const [ITEMS, MAP, STATS] = tabs

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
    console.log(activeTab)
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
        href={`#/item/${item.id}`}
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
    return <div>map</div>
  }

  renderStat(key, value) {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    )
  }

  renderStats() {
    if (!this.state.stats){
      return <Loading/>
    }
    return (
      <table className="table">
        <tbody>{Object.keys(this.state.stats).map(key => this.renderStat(key, this.state.stats[key]))}</tbody>
      </table>
    )
  }

  renderBody() {
    switch (this.state.activeTab) {
      case ITEMS:
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
