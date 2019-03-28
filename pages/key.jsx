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
    this.state = { loading: true, data: null, activeTab: tabs[0] }

    this.handleServerResponse = this.handleServerResponse.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    http.get(`/api/scan/${this.props.keyName}`).then(this.handleServerResponse)
  }

  handleServerResponse(data) {
    this.setState({ data, loading: false })
  }

  handleClick(activeTab) {
    console.log(activeTab)
    this.setState({ activeTab })
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

  renderStats() {
    return <div>stats</div>
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
