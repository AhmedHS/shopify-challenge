import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSearch } from './actions';
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
    this.props.submitSearch(this.state.search);
  }
  render() {
    console.log(this.props.results);
    return (
      <div className="App">
        <h1>Toronto Waste Lookup</h1>
        <input type="text" onKeyUp={this.updateSearch}/>
        <input type="button" value="Search" onClick={this.submitSearch}/>
      </div>
    );
  }
}
const mapStateToProps = (rState) => {
  return {
    results: rState.state.results,
  }
}
const mapDispatchToProps = {
  submitSearch,
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
