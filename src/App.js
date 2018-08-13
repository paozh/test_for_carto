import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import NavBar from './components/NavBar/NavBar';
import TimeSeries_3room from './components/TimeSeries/TimeSeries_3room';
import TimeSeries_4room from './components/TimeSeries/TimeSeries_4room';
import DisplayPanel from './components/DisplayPanel/DisplayPanel';
// import NavCol from './components/NavCol/NavCol';
// import CheckBoxes from './components/NavCol/CheckBoxes/CheckBoxes';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldReset: false,
      busStopHidden: false,
      btoHidden: false,
      schoolHidden: false,
      hawkerHidden: false,
      shoppingHidden: false
    };
  }

  resetHandler = () => {
    this.setState( {
      shouldReset: true
    })
  }

  resetClosure = () => {
    this.setState( {
      shouldReset: false
    })
  }

  toggleHawkerHidden = () => {
    console.log("in appjs, toggling hawker hidden");
    this.setState({
      hawkerHidden: !this.state.hawkerHidden 
    });
    console.log("done");
  }
  
  // Watch out for naming convention, can't pinpoint error.
  toggleBusStopHidden = () => {
    this.setState({
      busStopHidden: !this.state.busStopHidden 
    });
  }

  toggleSchoolHidden = () => {
    this.setState({
      schoolHidden: !this.state.schoolHidden 
    });
	}

  render() {
    return (
      <div className="App">
        <div className="content-fixed">
          <NavBar onClick={this.resetHandler} 
                  toggleHawkerHidden={this.toggleHawkerHidden} 
                  toggleBusHidden={this.toggleBusStopHidden} 
                  toggleSchoolHidden={this.toggleSchoolHidden}
                  />
        </div>

        <div>
        <div className = "navPage">
          <DisplayPanel/>
          </div>
        <div className="content-r"> 
            <Map shouldReset={this.state.shouldReset} 
                 resetClosure={() => this.resetClosure}
                 hawkerHidden={this.state.hawkerHidden}
                 busStopHidden={this.state.busStopHidden}
                 schoolHidden={this.state.schoolHidden}
                 />
              
        </div>
        </div>

        <div className = "content-TS">
        <div className = "content-TS4">
                    Time Series of 3-Room BTO 
                   <TimeSeries_3room/>
            </div>
        <div className = "content-TS3"> Time Series of 4-Room BTO <TimeSeries_4room/> </div>
        </div>
      </div>
    );
  }
}
