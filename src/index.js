import React, {Component} from 'react';
import {render} from 'react-dom';
import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from 'carto.js';
import airbnb from './data/airbnb';
import L from 'leaflet';
import {busdata} from './data/busstop.geojson';
import './index.css';
import axios from 'axios';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';
//console.log(busdata);
//var busdata = require('./data/busstop.geojson');

//var busdata = axios.get('./data/busstop.geojson')

//var test = isAuth();
console.log(busdata);

var testtest = 
	{
		"type": "FeatureCollection",
		"features": [
	   {
		 "type": "Feature",
		 "geometry": {
			"type": "Point",
			"coordinates":  [ 103.817225,1.282102 ]
		 },
		 "properties": {
		 "name":"Bt Merah Int",
		 "id":10009
		 }
	   },
	   {
		 "type": "Feature",
		 "geometry": {
			"type": "Point",
			"coordinates":  [ 103.837497,1.277738 ]
		 },
		 "properties": {
		 "name":"Opp New Bridge Rd Ter",
		 "id":10011
		 }
	   },
	   {
		 "type": "Feature",
		 "geometry": {
			"type": "Point",
			"coordinates":  [ 103.837626,1.27832 ]
		 },
		 "properties": {
		 "name":"Aft Hosp Dr",
		 "id":10017
		 }
	   },
	   {
		 "type": "Feature",
		 "geometry": {
			"type": "Point",
			"coordinates":  [ 103.838604,1.279008 ]
		 },
		 "properties": {
		 "name":"Bef Outram Rd",
		 "id":10018
		 }
	   }
	]
}
;

class App extends Component{

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
		
		this.setState({ nativeMap: this.nativeMap });
		L.geoJSON(testtest).addTo(this.nativeMap);
		
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