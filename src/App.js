import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSearch, clearSearch, favourite } from './actions';
import { FaSearch, FaTimesCircle, FaStar } from 'react-icons/fa';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };

    this.searchBar = React.createRef();
  }
  updateSearch = (event) => {
    if (event.keyCode == 13)
      this.props.submitSearch(this.state.search);
    this.setState({
      search: event.target.value,
    })
  }
  clearSearch = () => {
    this.setState({
      search: ""
    })
    this.searchBar.current.value = "";
    this.props.clearSearch();
  }
  submitSearch = () => {
    this.props.submitSearch(this.state.search);
  }
  favouriteItem = (input) => {
    this.props.favourite(input);
  }
  favourited = (title) => {
    let query = this.props.favourites.filter((result) => {
      return result.title === title
    })
    if (query.length > 0)
      return true;
    else
      return false;
  }
  readHTML = (input) => {
    let text = document.createElement("textarea");
    text.innerHTML = input;
    return text.value;
  }
  render() {
    console.log(this.props.favourites)

    return (
      <div className="App">
        <h1 id="header">Toronto Waste Lookup</h1>
        <input id="searchBar" type="text" ref={this.searchBar} onKeyUp={this.updateSearch} />
        {this.state.search.length > 0 ? <button id="clearButton" className="button" type="button" onClick={this.clearSearch}><FaTimesCircle /></button> : ''}
        <button id="searchButton" className="button" type="button" onClick={this.submitSearch}><FaSearch /></button>
        <table className="tables">
          <tbody>
            {
              this.props.results.map((result, x) =>
                <tr key={x}>
                  <td>
                    {this.favourited(result.title) ?
                      <button className="favourited button" type="button" onClick={() => { this.favouriteItem(result.title) }}><FaStar /></button>
                      :
                      <button className="unfavourited button" type="button" onClick={() => { this.favouriteItem(result.title) }}><FaStar /></button>
                    }
                  </td>
                  <td>{result.title}</td>
                  <td dangerouslySetInnerHTML={{ __html: this.readHTML(result.body) }}></td>
                </tr>
              )
            }
          </tbody>
        </table>
        {this.props.favourites.length > 0 ?
          <div>
            <h2 id="favHeader">Favourites</h2>
            <table className="tables">
              <tbody>
                {
                  this.props.favourites.map((result, x) =>
                    <tr key={x}>
                      <td>
                        {this.favourited(result.title) ?
                          <button className="favourited button" type="button" onClick={() => { this.favouriteItem(result.title) }}><FaStar /></button>
                          :
                          <button className="unfavourited button" type="button" onClick={() => { this.favouriteItem(result.title) }}><FaStar /></button>
                        }
                      </td>
                      <td>{result.title}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.readHTML(result.body) }}></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          : ''
        }
      </div>
    );
  }
}
const mapStateToProps = (rState) => {
  return {
    results: rState.state.results,
    favourites: rState.state.favourites
  }
}
const mapDispatchToProps = {
  submitSearch,
  clearSearch,
  favourite
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
