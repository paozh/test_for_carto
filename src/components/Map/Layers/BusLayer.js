import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class BusLayer extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    source: PropTypes.string,
    style: PropTypes.string,
    client: PropTypes.object,
    hidden: PropTypes.bool
  }

  constructor(props) {
    super(props);

    const { hidden, style } = props;

    const SQLquery = 'SELECT * FROM busstop_most_updated_1';
    const cartoSource = new carto.source.SQL(SQLquery);
    const cartoStyle = new carto.style.CartoCSS(style);

    this.layer = new carto.layer.Layer(cartoSource, cartoStyle, {
      featureOverColumns: ['name', 'latitude', 'longitude']
    });
    this.setVisibility(hidden)
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    // // Adds the Tooltip functionality
    // this.layer.on('featureOver', this.openTooltip);
    // const test = client.getLayers();
    // //test[0].setSQL = "SELECT * FROM busstop_most_updated_1 LIMIT DESC 10";

    // console.log(test);
    // // on click functionality
    // this.context.map.on('click', function(e){
    //   console.log(e.latlng);
    //   const currLayer = client.getLeafletLayer();
    //   console.log(currLayer);
    //   test[0].hide(); // remove old layer
  

    //   // this.layer.hide();
    // })

    var sql = "SELECT ST_X(ST_Centroid(the_geom)) as longitude, ST_Y(ST_Centroid(the_geom)) as latitude, name, ST_Distance(the_geom::geography, ST_PointFromText('POINT(-73.999548 40.71954)', 4326)::geography) AS distance FROM {busstop_most_updated_1} ORDER BY the_geom <-> ST_PointFromText('POINT(-73.999548 40.71954)', 4326) LIMIT 10";
  }


  // Optimisation of updates, not required for functionality
  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  // Hides the layer when called in render()
  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }

  //Function that adds the Tooltip functionality
  openTooltip = (featureEvent) => {
    this.props.handleMarker([featureEvent.data.latitude,
        featureEvent.data.longitude],
        featureEvent.data.name);
  }

  render() {
    const { hidden, style } = this.props;

    if (hidden) {
      this.layer.hide();
    } else {
      this.layer.show();
    }

    const layerStyle = this.layer.getStyle();

    layerStyle.setContent(style).then(() => this.setVisibility(hidden));

    return null;
  }
}

export default BusLayer;