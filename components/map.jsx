const React = require('react')
import Map from 'ol/Map'
import View from 'ol/View'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js'
import { Vector as VectorSource } from 'ol/source.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js'

const image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({ color: 'red', width: 1 })
})

const MapComponent = class extends React.PureComponent {
  styleFunction(feature) {
    return new Style({
      stroke: new Stroke({
        color: 'red',
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)'
      }),
      image
    })
  }
  componentDidMount() {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(this.props.geoJson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    })

    new Map({
      target: this.refs.map,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://{a-c}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'// 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        new VectorLayer({
          source: vectorSource,
          style: this.styleFunction
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
        style={{ width: '100%', height: this.props.height || 650 }}
        ref="map"
      />
    )
  }
}

module.exports = MapComponent
