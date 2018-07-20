import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import './Map.css';
import airbnb from './airbnb';
import carto from 'carto.js';
import current_BTO from '../../data/Current_BTO.json';
import L from 'leaflet';


var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

class MapSG extends React.Component {

    state = {
        center: [1.3521, 103.8198],
        zoom: 13,
        nativeMap: undefined,
        layerStyle: airbnb.style,
        hidelayers: true
    }    

    client = new carto.Client({
		apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
		username: 'wesleynsc'
    });

    componentDidMount(){
	// 	// set state of map
        this.setState({ nativeMap: this.nativeMap });
    //     // create layer base on current_BTO and to create pop up based on it
	// 	L.geoJSON(current_BTO, {
	// 	onEachFeature: function (f, l) {
	// 	  l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/["]/g,'')+'</pre>');
	// 	}
    //    }).addTo(this.nativeMap);	

	}


	render(){
		const { center, nativeMap, zoom } = this.state;
		return (
		<main>
			<Map 
				center = {center}
				zoom = {zoom}
				ref = {node => {this.nativeMap = node && node.leafletElement}}>
			<TileLayer 
				attribution = ""
				url = {CARTO_BASEMAP} />
			</Map>	
		</main>
		);
	}
    

}




export default MapSG;