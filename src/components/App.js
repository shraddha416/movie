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
      key: '',
      error: '',
      endofSearch: false,
      isSearching: false,
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getList(key,page = undefined) {
    let that = this;
    let request = new XMLHttpRequest();
    let url = `https://www.omdbapi.com/?apikey=80d8aa1e&s=${key}&page=${page || this.state.page}`;
    // console.log(that.state.page,"inside function------------>");

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        // console.log(response.Search,that.state.page,"inside function------------>");
        that.setState({ loading: false })

        if(response.Response === 'False') that.setState({ error: response.Error });
        else if(that.props.list && that.props.list.length + 10 > response.totalResults && !that.state.isSearching)
        {
          // console.log(1);
          that.props.actions.appendList(response.Search);
          that.setState({ error: '', endofSearch: true });
        }
        else if(that.state.isSearching || that.state.page === 1)
        {
          // console.log(2);
          that.props.actions.addNewList(response.Search);
          that.setState({ error: '', isSearching: false });
        }
        else
        {
          // console.log(3);
          that.props.actions.appendList(response.Search);
          that.setState({ error: '' });
        }
      }
    };

    request.open("GET", url, true);
    request.send();
  };
  componentWillMount() {
    this.setState({ key: 'aa' });
  }

  componentDidMount() {
    this.getList(this.state.key);
  }

  handleChange(event) {
    this.setState({ key: event.target.value, isSearching: true, page: 1, endofSearch:false });
  }

  handleSubmit(event) {
    this.getList(this.state.key);
    event.preventDefault();
  }


  render() {
    // console.log(this.props.list,this.state.page,this.state.error,"-------------->");
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.key} onChange={this.handleChange} placeholder="Search for movies here" />
            <input type="submit" value="Search" />
          </form>
        </header>
        <div className="mainContainer">
          {
            (this.props.list && this.props.list.length>0 && this.state.error === "") ? (
              this.props.list.map((res, index) => {
                return (<Link to={`/${res.imdbID}`} key={index.toString()}>
                  <div className="card">
                    { (res.Poster !== 'N/A') ? <img src={ res.Poster } height="180px" width="150px"/> :
                      <span id="dummy_image">{res.Title[0]}</span>}
                    <div className="title">{res.Title}</div>
                    <div className="year">( {res.Year} )</div>
                  </div>
                </Link>)
              })
            ) : (this.state.error === "")? null : (<p>{this.state.error}</p>)
          }
          {
            (this.state.endofSearch || this.state.loading || this.state.error!=="") ? (this.state.loading) ? (<div className="loader"></div>) : null :
              <button onClick={
                ()=>
                  {
                    this.setState({ page: this.state.page+1, loading: true });this.getList(this.state.key,this.state.page+1);}
                  }>Load More</button>
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    list: state.list
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }))(App);
