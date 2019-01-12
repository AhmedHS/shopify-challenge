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

    this.searchBar = React.createRef();
  }
  updateSearch = (event) => {
    this.setState({
      search: event.target.value,
    })
  }
  clearSearch = () => {
    this.setState({
      search: ""
    })
    this.searchBar.current.value = "";
  }
  submitSearch = () => {
    this.props.submitSearch(this.state.search);
  }
  readHTML = (input) => {
    let text = document.createElement("textarea");
    text.innerHTML = input;
    return text.value;
  }
  render() {
    return (
      <div className="App">
        <h1>Toronto Waste Lookup</h1>
        <input type="text" ref={this.searchBar} onKeyUp={this.updateSearch}/>
        <input type="button" value="X" onClick={this.clearSearch}/>
        <input type="button" value="Search" onClick={this.submitSearch}/>
        <table>
          <tbody>
          {
            this.props.results.map((result, x) =>
              <tr key={x}>
                <td>{result.title}</td>
                <td dangerouslySetInnerHTML={{__html: this.readHTML(result.body)}}></td>
              </tr>
            )
          }
          </tbody>
        </table>
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
