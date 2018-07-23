import React from 'react';
import { Map, TileLayer} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import LayerSQL from './LayerSQL';
import LayerData from './LayerDataset';
import BusLayer from './Layers/BusLayer';
import District from './Layers/District';

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

var bounds = [[1.1962530584216953,103.58157000878907], [1.4873106102494986,104.04299579003907]]; 

class MapExample extends React.Component {

    state = {
	    center: [1.355075, 103.600494],
        zoom: 12
	}    

	render(){
		const { center, zoom } = this.state;
		return (
		<div>
			<Map id="mapid"
				center = {center}
				zoom = {zoom}
				animate={true}
				>
			<TileLayer 
				attribution = "Input value in TileLayer: Attribution"
				url = {CARTO_BASEMAP} />
				<BusLayer style={style} client={client} hidden={false}/>
				<District style = {style} clien ={client} hidden = {false}/>
			{/* <LayerSQL source={sourceBus} style={style} hidden={false} client={client}/> */}
				{/* <Layer source={sourceMRT} style={} hidden={false} client={client}/>
				<Layer source={sourceHawker} style={} hidden={false} client={client}/>
				<Layer source={sourceSchool} style={} hidden={false} client={client}/>
				<Layer source={sourceShopping} style={} hidden={false} client={client}/> */}
			</Map>	
		</div>
		);
	}
}

export default MapExample;
