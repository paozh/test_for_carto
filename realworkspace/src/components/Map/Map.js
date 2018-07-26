import React, { createRef } from 'react';
import {
	Map, TileLayer, Popup,
	Marker, GeoJSON, LayersControl, LayerGroup
} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import BusLayer from './Layers/BusLayer';
import BTOdata from '../../data/Current_BTO.json';
import BTOLayer from './Layers/BTOLayer';
const { BaseLayer, Overlay } = LayersControl;


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
//var popup = L.popup({closeButton:false});
// Initial boundaries set for panning, [LEFT CORNER, RIGHT CORNER] (longitude, latitude) OR (y,x)
var bounds = [[1.2462530584216953, 103.17157000878907], [1.4573106102494986, 104.02299579003907]];




class MapExample extends React.Component {

	state = {
		center: [1.355075, 103.60494],
		zoom: 12,
		maxBounds: bounds,
		maxZoom: 18,
		minZoom: 12,
		clicked: 0
	}

	// create reference
	mapRef = createRef();


	componentDidMount() {
		//this.mapRef = this.refs.map.leafletElement; // <= this is the Leaflet Map object
		console.log(this.mapRef);
		var layers = this.mapRef.current.leafletElement._layers; // <-- get all layers
		// this.mapRef.getLayers()
		// 	  .on('featureClick', function(e, latlng, pos, data) {
		// 		console.log(e, latlng, pos, data);
		// 	  })
		// 	  .on('error', function(err) {
		// 		console.log('error: ' + err);
		// 	  });

		  
	}

	componentDidUpdate() {
		console.log(this.state.clicked);
	}

	// reset button
	handleReset = () => {
		console.log("flying");
		this.mapRef.current.leafletElement.flyToBounds(bounds); //** having some problems now because i changed the reference */
	}


	// handle clicks
	handleClick = () => {
		this.mapRef.current.leafletElement.locate() // click on a react-leaflet layer
		
		console.log(this.mapRef.current.leafletElement.locate()); 
	}

	handleLocationFound = e => {
		this.setState({
			hasLocation: true,
			latlng: e.latlng,
		})
	}

	onClickPoly = () => {
		this.setState({ clicked: this.state.clicked + 1 })
	}

	// on each feature function 
	// used with GeoJSON
	onEachFeature = (feature, layer) => {
		layer.bindPopup(feature.properties.name);
		layer.on('click', function (e) {
			console.log(e);
		})
	}

	render() {
		// initialise data
		const data = () => {
			const json = BTOdata;
			return <GeoJSON
				data={json}
				onEachFeature={this.onEachFeature} />
		}

		if (this.props.shouldReset) {
			console.log("shouldReset");
			this.handleReset();
			this.props.resetClosure();
		}

		const { center, zoom, maxBounds, maxZoom, minZoom } = this.state;

		return (
			<div>
				{/* Must have id="mapid" */}
				<Map ref={this.mapRef} id="mapid"
					center={center}
					zoom={zoom}
					animate={true}
					maxBounds={maxBounds}
					maxZoom={maxZoom}
					minZoom={minZoom}
					onClick={this.handleClick}
					onLocationfound={this.handleLocationFound}
				>

					<LayersControl position="topright">

						<TileLayer
							attribution="Input value in TileLayer: Attribution"
							url={CARTO_BASEMAP} />
						{/* <BusLayer style={style} client={client} hidden={true}/> */}
						{/* <LayerSQL source={sourceBus} style={style} hidden={false} client={client}/> */}
						{/* <Layer source={sourceMRT} style={} hidden={false} client={client}/>
				<Layer source={sourceHawker} style={} hidden={false} client={client}/>
				<Layer source={sourceSchool} style={} hidden={false} client={client}/>
				<Layer source={sourceShopping} style={} hidden={false} client={client}/> */}




						<Overlay checked name={"Current BTO"} key={"1"}>

							<LayerGroup>
								<BTOLayer style={BTOstyle} client={client} hidden={false} onEachFeature ={this.onEachFeature} />
							</ LayerGroup>
						</ Overlay>

						<LayerGroup>
							<span>	{data()} </span>
						</ LayerGroup>

						{/* for testing purposes  */}
						{/* <Marker position={center}>
							<Popup> Test test <br /> hello </Popup>
						</Marker> */}

					</LayersControl>
				</Map>
			</div>
		);
	}
}

export default MapExample;