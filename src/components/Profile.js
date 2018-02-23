/**
 * Created by zopper on 20/02/18.
 */
import React from 'react';

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      movieInfo : undefined,
      error: undefined,
    }
  }

  getMovieDetails(key) {
    let that = this;
    let request = new XMLHttpRequest();
    let url = `https://www.omdbapi.com/?apikey=80d8aa1e&i=${key}&plot=full`;

    request.onreadystatechange = function() {
      console.log(this.readyState,this.status);
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        if(response.Response) that.setState({ movieInfo: response });
      }
      else if(this.readyState === 4) {
        that.setState({ error: true });
      }
    }

    request.open("GET", url, true);
    request.send();
  };

  componentWillMount(){
    this.getMovieDetails(this.props.match.params.imdbId);
  }

  render() {
    console.log(this.state.movieInfo);
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="mainContainer">
          {(this.state.movieInfo) ? (<div style={{ display: 'flex' }}>
            {(this.state.movieInfo.Poster !== 'N/A') ? <img src={this.state.movieInfo.Poster} /> :
              <span id="dummy_image" style={{ height: 430,width: 300 }}>{this.state.movieInfo.Title[0]}</span> }
            <div style={{ paddingLeft: 40 , textAlign: 'left' }}>
              <p className="desc">
                <span className="bold">Title : </span>{this.state.movieInfo.Title}
              </p>
              <p className="desc">
                <span className="bold">Plot : </span>{this.state.movieInfo.Plot}
              </p>
              <p className="desc">
                <span className="bold">Country : </span>{this.state.movieInfo.Country}
              </p>
              <p className="desc">
                <span className="bold">Director : </span>{this.state.movieInfo.Director}
              </p>
              <p className="desc">
                <span className="bold">Language : </span>{this.state.movieInfo.Language}
              </p>
              <p className="desc">
                <span className="bold">Runtime : </span>{this.state.movieInfo.Runtime}
              </p>
              <p className="desc">
                <span className="bold">Year : </span>{this.state.movieInfo.Year}
              </p>
              <p className="desc">
                <span className="bold">Released Date : </span>{this.state.movieInfo.Released}
              </p>
              <p className="desc">
                <span className="bold">IMDB Ratings : </span>{this.state.movieInfo.imdbRating}
              </p>
              <p className="desc">
                <span className="bold">Awards : </span>{this.state.movieInfo.Awards}
              </p>
            </div>
          </div>) : (this.state.error) ? <p>Something went Wrong</p> : (<div className="loader"></div>)}
        </div>
      </div>
    );
  }
}

export default Profile;
