import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import data from './resources/swm_waste_wizard_APR.json';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <h1>Toronto Waste Lookup</h1>
        <input type="text"/>
        <input type="button" value="Search"/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps)(App);
