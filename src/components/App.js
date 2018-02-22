import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../Actions/index';

import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      list: [],
      key: '',
      error: '',
      endofSearch: false,
      isSearching: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getList(key) {
    let that = this;
    let request = new XMLHttpRequest();
    let url = `http://www.omdbapi.com/?apikey=80d8aa1e&s=${key}&page=${this.state.page}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        console.log(response.Search,"------------>");
        if(response.Search) that.props.actions.addList(response.Search);
        if(response.Response === 'False') that.setState({ error: response.Error });
        else if(that.state.list && that.state.list.length + 10 > response.totalResults)
          that.setState({ list: that.state.list.concat(response.Search), error: '', endofSearch: true });
        else if(that.state.isSearching)
          that.setState({ list: response.Search, error: '', isSearching: false });
        else that.setState({ list: that.state.list.concat(response.Search), error: '' });
      }
    };

    request.open("GET", url, true);
    request.send();
  };
  componentWillMount() {
    this.setState({ key: 'aa' });
  }

  componentDidMount() {
    if(this.state.list.length<1) this.getList(this.state.key);
  }

  handleChange(event) {
    this.setState({ key: event.target.value, isSearching: true, page: 1, endofSearch:false });
  }

  handleSubmit(event) {
    this.getList(this.state.key);
    event.preventDefault();
  }


  render() {
    console.log(this.state.list,this.state.page,this.state.error);
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.key} onChange={this.handleChange} />
            <input type="submit" value="Search" />
          </form>
        </header>
        <div className="mainContainer">
          {
            (this.state.list && this.state.error === "") ? (
              this.state.list.map((res, index) => {
                return (<Link to={`/${res.imdbID}`} key={index.toString()}>
                  <div className="card">
                    <img src={ res.Poster} height="150px" width="150px"/>
                    <div>Title : {res.Title}</div>
                    <div>Year : {res.Year}</div>
                  </div>
                </Link>)
              })
            ) : (this.state.error === "")? (<p>loading....</p>) : (<p>{this.state.error}</p>)
          }
          {
            (this.state.endofSearch) ? null:
              <button onClick={()=> { this.setState({ page: this.state.page+1 });this.getList(this.state.key)}}>Load More</button>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }))(App);
