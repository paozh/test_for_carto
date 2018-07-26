import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import L from 'leaflet';

class BTOLayer extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    source: PropTypes.string,
    client: PropTypes.object,
    hidden: PropTypes.bool
  }

  constructor(props) {
    super(props);

    const { hidden, style } = props;

    const SQLquery = 'SELECT * FROM current_bto';


    const cartoSource = new carto.source.SQL(SQLquery);
    const cartoStyle = new carto.style.CartoCSS(style);

    this.layer = new carto.layer.Layer(cartoSource, cartoStyle);
    this.setVisibility(hidden);


  }

  componentDidMount() {
    const { client } = this.props;
    console.log(this.props);

    // this.layer.on('featureClick',function(e,latlng, pos, data, subLayerIndex){
    //   console.log('test' + data);
    // })
   // this.layer.trigger('featureClick', null, latlng, null, { cartodb_id: row.properties.cartodb_id }, 0);

    // client.addLayer(this.layer);
    
    // client.getLeafletLayer().addTo(this.context.map);
    // console.log(client.getLayers());

    client.addLayer(this.layer);

    client.getLeafletLayer().addTo(this.context.map)
    .on('done', function(layer) {
      layer
        .on('featureClick', function(e, latlng, pos, data) {
          console.log(e, latlng, pos, data);
        })
        .on('error', function(err) {
          console.log('error: ' + err);
        });
    }).on('error', function(err) {
      console.log("some error occurred: " + err);
    });
    // client.getLeafletLayer().addTo(this.context.map).on('done', function(layer){
    //   layer.getSubLayer(0).setInteraction(true);
    //   layer.getSubLayer(0).setInteractivity('cartodb_id');

    //   layer.on('featureClick',function(e,latlng, pos, data, subLayerIndex){
    //     console.log('test' + data);
    //   })
    // });
    }
    onEachFeature = (feature, layer) => {
      layer.bindPopup(feature.properties.name);
      layer.on('click', function (e) {
        console.log(e);
      })
    }
    
    
    // const popup = L.popup({closeButton:false});
    // this.layer.on(carto.layer.events.FEATURE_OVER, featureEvent => {
    //   popup.setLatLng(featureEvent.latLng);
    //   if (!popup.isOpen()) {
    //     popup.setContent(featureEvent.data.name);
    //     popup.openOn(this.map);
    //   }
    // });
    //L.geoJSON(null, {onEachFeature: onEachFeature}).addTo(this.context.map);


  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }



	// function onEachFeature(feature, layer){
	// 	layer.on({
	// 		click: featureclick
	// 	});
  // }
    
  // //	test for clicking feature
	// function featureclick(e){
	// 	var layer = e.target;
  //   layer.bindPopup("hello");
	// }



  render() {
    const { hidden, style } = this.props;
    const layerStyle = this.layer.getStyle();

    layerStyle.setContent(style).then(() => this.setVisibility(hidden));

    return null;
  }
}


export default BTOLayer;