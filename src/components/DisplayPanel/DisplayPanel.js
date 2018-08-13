import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class DisplayPanel extends Component{
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
        const source1 = new carto.source.SQL('SELECT * FROM busstop_most_updated_1');
        const filter1 = new carto.filter.Category('name', {in:'Yishun'});
        console.log(source1);
        source1.addFilter(filter1);
        console.log(filter1);
        
        // var sql = new carto.SQL({ user: 'wesleysnc' });
        // var test = sql.execute('SELECT * FROM busstop_most_updated_1');
    
    }
      componentDidMount(){
        const { client } = this.props;
          console.log(this.test);
      }
      render() {
          return null;
      }
}

export default DisplayPanel;