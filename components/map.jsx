const React = require('react')
import Map from 'ol/Map'
import View from  'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

const MapComponent = class extends React.PureComponent {
  componentDidMount() {
    new Map({
      target: this.refs.map,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })
  }
  render() {
    return (
      <div
        style={{ width: '100%', height: (this.props.height || 650) }}
        ref="map"
      />
    )
  }
}

module.exports = MapComponent
