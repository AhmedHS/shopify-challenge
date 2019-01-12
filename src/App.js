import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testAction } from './actions';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
    };
  }
  updateSearch = (event) => {
    this.setState({
      search: event.target.value,
    })
  }
  submitSearch = () => {
    this.props.testAction();
  }
  render() {
    return (
      <div className="App">
        <h1>Toronto Waste Lookup</h1>
        <input type="text" onKeyPress={this.updateSearch}/>
        <input type="button" value="Search" onClick={this.submitSearch}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = {
  testAction,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
