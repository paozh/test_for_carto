import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import LayerSQL from './LayerSQL';
import LayerData from './LayerDataset';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

var client = new carto.Client({
	apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
	username: 'wesleynsc'
});
var style = `
	#layer {
		marker-width: 9;
		marker-fill: #EE4D5A;
		marker-line-color: #FFFFFF;
	}
`;

var sourceBus = 'SELECT * FROM busstop';
// var sourceMRT;
// var sourceHawker;
// var sourceShopping;
// var sourceSchool; 


class MapExample extends React.Component {

    state = {
        center: [1.3521, 103.8198],
        zoom: 13
	}    
	
    // componentDidMount(){
	// // 	// set state of map
    // //     this.setState({ nativeMap: this.nativeMap });
    // //     // create layer base on current_BTO and to create pop up based on it
	// // 	L.geoJSON(current_BTO, {
	// // 	onEachFeature: function (f, l) {
	// // 	  l.bindPopup('<pre>'+JSON.stringify(f.properties,null,' ').replace(/["]/g,'')+'</pre>');
	// // 	}
    // //    }).addTo(this.nativeMap);	
		
	// 	this.setState({nativeMap: this.nativeMap});
	// 	console.log("print in map.js");
	// }

	render(){
		const { center, zoom } = this.state;
		return (
		<div>
			<Map id="mapid"
				center = {[1.3521, 103.8198]}
				zoom = {13}>
			<TileLayer 
				attribution = "Input value in TileLayer: Attribution"
				url = {CARTO_BASEMAP} />
			<LayerSQL source={sourceBus} style={style} hidden={false} client={client}/>
				{/* <Layer source={busstop} style={} hidden={false} client={client}/>
				<Layer source={mrt} style={} hidden={false} client={client}/>
				<Layer source={shopping} style={} hidden={false} client={client}/>
				<Layer source={hawkers} style={} hidden={false} client={client}/>
				<Layer source={schools} style={} hidden={false} client={client}/> */}
			</Map>	
		</div>
		);
	}
}

export default MapExample;