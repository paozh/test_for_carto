import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class CheckBoxes extends Component {
  constructor (props) {
    super(props);
    
    this.state = { 
        cSelected: [],
        layers: ['Amenities', 'Clinics', 'Groceries', 'Hawker Centers', 'Banks', 'Schools']
    };

    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }

  onCheckboxBtnClick(selected) {
    const index = this.state.cSelected.indexOf(selected);
    const item = this.state.layers[selected];
    if (index < 0) {
      this.state.cSelected.push(item);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }

  render() {
    return (
      <div>
        <h1>Checkbox Buttons</h1>
        <ButtonGroup vertical size="large">
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(0)} active={this.state.cSelected.includes(this.state.layers[0])}>One</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(this.state.layers[1])}>Two</Button>
          <Button color="primary" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(this.state.layers[2])}>Three</Button>
        </ButtonGroup>
        <p>Filters On: {JSON.stringify(this.state.cSelected)}</p>
      </div>
    );
  }
}

export default CheckBoxes;