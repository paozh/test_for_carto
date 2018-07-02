import React, { Component } from 'react';
import { render } from 'react-dom';
import L from 'leaflet'
import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from 'carto.js';
import Layer from './components/Layer';
import airbnb from './data/airbnb';
import utils from './utils/index';
import './index.css';

var dataview = 'E:\Orbital\dataset\Bus stops in Singapore.csv';
var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
//const CARTO_BASEMAP = L.map('map').setView([50, 15], 4);

class App extends Component {
  state = {
    center: [1.3521, 103.8198],
    zoom: 12,
    nativeMap: undefined,
    layerStyle: airbnb.style,
    hidelayers: true
  }

  cartoClient = new carto.Client({ apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2', username: 'wesleynsc' });

  dataset = new carto.source.Dataset('european_cities');

  cartoClient.addLayer(Layer)
   .then(() => {
   console.log('Layer added');
 })
 .catch(cartoError => {
   console.error(cartoError.message);
 });


  componentDidMount() {
    this.setState({ nativeMap: this.nativeMap });
  }

  handleClick = (e) => {
    this.addMarker();
  }


  render() {
    const { center, nativeMap, zoom } = this.state;

    return (
      <main>
        <Map center={center} zoom={zoom} ref={node => { this.nativeMap = node && node.leafletElement }}>
          <Basemap attribution="" url={CARTO_BASEMAP} />

          <Layer
            source={airbnb.source}
            style={this.state.layerStyle}
            client={this.cartoClient}
            hidden={this.state.hidelayers}
          />
        </Map>

      
      </main>
    );
  }


}

render(<App />, document.getElementById('root'));
