import React, {Component} from 'react';
import {render} from 'react-dom';
import { Map, TileLayer as Basemap, GeoJSON } from 'react-leaflet';
import carto from 'carto.js';
import airbnb from '../../data/airbnb';
import * as L from 'leaflet';
import current_BTO from '../../data/Current BTO.json';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

let data1;

class MapSG extends Component{
	constructor(props) {
	super();
		// create state
	this.state = {
  	center: [1.3521, 103.8198],
  	zoom: 13,
  	nativeMap: undefined,
  	layerStyle: airbnb.style,
	  hidelayers: true,
	  data: current_BTO,
	  layer: undefined
	}

	}

cartoClient = new carto.Client({
		apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
		username: 'wesleynsc'
	})
	
	componentDidMount(){
		// set state of map
        this.setState({ nativeMap: this.nativeMap });
        // create layer base on current_BTO and to create pop up based on it
		L.geoJSON(current_BTO, 
			{onEachFeature: this.onEachFeature}).addTo(this.nativeMap);
	   console.log(this.state.layer);	
	}

	// events to handle clicking
	onEachFeature = (feature, layer) => {
		this.setState({layer: this.layer});
		layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}"]/g,'')+'</pre>');
		layer.on({
			// mouse functions
			mouseover: this.highlightFeature,
			mouseout: this.resetHighlight,
			click: this.clickToFeature
		});
	}

	clickToFeature = (e) => {
		this.setState({layer: e.target});
		console.log("I clicked on", this.state.layer.feature.properties.name);
	}


	render(){
		const { center, nativeMap, zoom } = this.state;
		return (
		<main>
			<Map 
				center = {center}
				zoom = {zoom}
				ref = {node => {this.nativeMap = node && node.leafletElement}}
				id = "mapid">
			<Basemap 
				attribution = ""
				url = {CARTO_BASEMAP} />
			<GeoJSON
				ref = "geojson"
				data = {current_BTO}
				onEachFeature = {this.onEachFeature}
			/>
			</Map>	
		</main>
		);
	}

}


export default MapSG;