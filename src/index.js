import React, {Component} from 'react';
import {render} from 'react-dom';
import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from 'carto.js';
import airbnb from './data/airbnb';
import L from 'leaflet';
import './index.css';
import current_BTO from './data/Current BTO.json';
import testtest from './data/busstop.json';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

var polygonLayer = [];

// to create a current BTO layer from data (geojson file format actually)
for (var key in current_BTO.features){
	const coordinates = current_BTO.features[key].geometry.coordinates;
	const name = current_BTO.features[key].properties[name];
	polygonLayer.push(coordinates);
	//console.log(polygonLayer);
}

class App extends Component{

// create state
state = {
  center: [1.3521, 103.8198],
  zoom: 13,
  nativeMap: undefined,
  layerStyle: airbnb.style,
  hidelayers: true
}

cartoClient = new carto.Client({
		apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
		username: 'wesleynsc'
	})
	
	componentDidMount(){
		// set state of map
		this.setState({ nativeMap: this.nativeMap });
		L.geoJSON(current_BTO, {
		onEachFeature: function (f, l) {
		  l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
		}
	   }).addTo(this.nativeMap);	
	}


	render(){
		const { center, nativeMap, zoom } = this.state;
		return (
		<main>
			<Map 
				center = {center}
				zoom = {zoom}
				ref = {node => {this.nativeMap = node && node.leafletElement}}>
			<Basemap 
				attribution = ""
				url = {CARTO_BASEMAP} />
			</Map>	
		</main>
		);
	}

}


render(<App />, document.getElementById('root'));