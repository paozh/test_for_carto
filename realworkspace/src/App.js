import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import NavBar from './components/NavBar/NavBar';
import NavCol from './components/NavCol/NavCol';
import CheckBoxes from './components/NavCol/CheckBoxes/CheckBoxes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content-fixed">
          <NavBar/>
        </div>

        <div className="content-r"> 
            {/* <NavCol>
              <CheckBoxes/>
              </NavCol> */}
            <Map/>
        </div>

      </div>
    );
  }
}

export default App;