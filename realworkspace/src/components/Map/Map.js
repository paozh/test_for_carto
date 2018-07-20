import React, {createRef} from 'react';
import { Map, TileLayer} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import BusLayer from './Layers/BusLayer';
import BTOLayer from './Layers/BTOLayer';


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

var BTOstyle = `
	#layer {
		polygon-fill: rgba(128, 128, 128, 1);
		polygon-opacity: 1;
	}
`;

// Initial boundaries set for panning, [LEFT CORNER, RIGHT CORNER] (longitude, latitude) OR (y,x)
var bounds = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 

class MapExample extends React.Component {

    state = {
	    center: [1.355075, 103.60494],
		zoom: 12,
		maxBounds: bounds,
		maxZoom: 18,
		minZoom: 12,
	}    

	componentDidMount() {
		this.mapRef = this.refs.map.leafletElement; // <= this is the Leaflet Map object
	}

	handleReset = () => {
		console.log("flying");
		this.mapRef.flyToBounds(bounds);
	}

	render(){
		if (this.props.shouldReset) {
			console.log("shouldReset");
			this.handleReset();
			this.props.resetClosure();
		}

		const { center, zoom, maxBounds, maxZoom, minZoom } = this.state;
		return (
		<div>
			{/* Must have id="mapid" */}
			<Map ref="map" id="mapid"
				center = {center}
				zoom = {zoom}
				animate={true}
				maxBounds={maxBounds}
				maxZoom={maxZoom}
				minZoom={minZoom}
				>
			<TileLayer 
				attribution = "Input value in TileLayer: Attribution"
				url = {CARTO_BASEMAP} />
				{/* <BusLayer style={style} client={client} hidden={true}/> */}
				<BTOLayer style={BTOstyle} client={client} hidden={false}/>
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