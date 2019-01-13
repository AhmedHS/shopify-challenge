import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitSearch, favourite } from './actions';
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
    if(event.keyCode == 13)
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
        <h1>Toronto Waste Lookup</h1>
        <input type="text" ref={this.searchBar} onKeyUp={this.updateSearch} />
        {this.state.search.length > 0 ? <input type="button" value="X" onClick={this.clearSearch} /> : ''}
        <input type="button" value="Search" onClick={this.submitSearch} />
        <table>
          <tbody>
            {
              this.props.results.map((result, x) =>
                <tr key={x}>
                  <td>
                    {this.favourited(result.title) ?
                      <input type="button" value="X" onClick={() => { this.favouriteItem(result.title) }} />
                      :
                      <input type="button" value="F" onClick={() => { this.favouriteItem(result.title) }} />
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
            <h2>Favourites</h2>
            <table>
              <tbody>
                {
                  this.props.favourites.map((result, x) =>
                    <tr key={x}>
                      <td>
                        {this.favourited(result.title) ?
                          <input type="button" value="X" onClick={() => { this.favouriteItem(result.title) }} />
                          :
                          <input type="button" value="F" onClick={() => { this.favouriteItem(result.title) }} />
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
  favourite
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
