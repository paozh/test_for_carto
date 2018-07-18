import React, {Component} from 'react';
import { Map, TileLayer as Basemap } from 'react-leaflet';
import carto from 'carto.js';
import MapStyle from '../../data/MapStyle';
import L from 'leaflet';
import current_BTO from '../../data/Current BTO.json';
import './Map.css';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

// var polygonLayer = [];
// mannual creation of layer (loop through the json file)
// to create a current BTO layer from data (geojson file format actually)
// **** not needed **** i leave it here just in case
// for (var key in current_BTO.features){
// 	const coordinates = current_BTO.features[key].geometry.coordinates;
// 	const name = current_BTO.features[key].properties[name];
// 	polygonLayer.push(coonjrdinates);
// 	//console.log(polygonLayer);
// }

class MapSG extends Component {

// create state
state = {
  center: [1.3521, 103.8198],
  zoom: 13,
  nativeMap: undefined,
  layerStyle: MapStyle.style,
  hidelayers: true
}

cartoClient = new carto.Client({
		apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
		username: 'wesleynsc'
	})
	
	componentDidMount(){
		// set state of map
        this.setState({ nativeMap: this.nativeMap });
        // create layer base on current_BTO and to create pop up based on it
		L.geoJSON(current_BTO, {
		onEachFeature: function (f, l) {
		  l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/["]/g,'')+'</pre>');
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


export default MapSG;