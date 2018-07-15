import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import Layer from './Layer';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

var client = new carto.Client({
	apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
	username: 'wesleynsc'
});

var source = new carto.source.Dataset(`bus_stops_in_singapore`);
var style = new carto.style.CartoCSS(`
	#layer {
		marker-width: 9;
		marker-fill: #EE4D5A;
		marker-line-color: #FFFFFF;
	}
`);


class MapExample extends React.Component {

    state = {
        center: [1.3521, 103.8198],
        zoom: 13,
        nativeMap: undefined,
        layerStyle: null,
        hidelayers: true
    }    



    componentDidMount(){
	// 	// set state of map
    //     this.setState({ nativeMap: this.nativeMap });
    //     // create layer base on current_BTO and to create pop up based on it
	// 	L.geoJSON(current_BTO, {
	// 	onEachFeature: function (f, l) {
	// 	  l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/["]/g,'')+'</pre>');
	// 	}
    //    }).addTo(this.nativeMap);	

        this.setState({nativeMap: this.nativeMap});
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
			<Layer source={source} style={style} hidden={true} client={client}/>
			</Map>	
		</main>
		);
	}
    

}




export default MapExample;