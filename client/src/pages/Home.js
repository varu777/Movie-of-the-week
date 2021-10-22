import React from 'react';
import '../App.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import SuggestionForm from '../components/SuggestionForm';
import MovieContainer from '../components/MovieContainer';
import formatDate from '../utils/dateFormatterUtil';

class Home extends React.Component {
  state = {
    isMovieSelected: false,
    movieOTW: '',
    userOTW: '', 
    date: '',
    noteOTW: '',
    description: '',
    posterLink: '',
    previousMovies: [],
    currentPool: [],
    upcomingMovies: [],
    recentUpdates: [],
    isLoading: true,
    loggedIn: false
  }
  
  componentDidMount () {
    // retrieve watched movies
    axios({
      method: 'get', 
      url: process.env.REACT_APP_HOME_DATA_URL,
      withCredentials: true
    })

    .then((response) => {
      // get motw data
      let movieOTWData = response.data.movieOTW;
      let user = response.data.user;

      // display motw if it's not blank
      let isMovieSelected = (movieOTWData.watchOTW.length === 0) ? false : true;
      
      let movies = response.data.watchedMovies;
      this.setState({
        previousMovies: movies, 
        isMovieSelected: isMovieSelected,
        movieOTW: movieOTWData.watchOTW,
        userOTW: user, 
        noteOTW: movieOTWData.note, 
        genre: movieOTWData.genre,
        rating: movieOTWData.rating,
        posterLink: movieOTWData.posterLink,
        runtime: movieOTWData.runtime,
        upcomingMovies: response.data.upcomingMovies, 
        description: movieOTWData.description,
        currentPool: response.data.currentPool,
        recentUpdates: response.data.recentUpdates,
        isLoading: false,
        imgLoaded: false 
      });
    })
    .catch((error) => {
      window.alert("Unable to load home data: " + error);
    })

    this.setState({loggedIn: this.context});
  }
  
  updateMovieSort = (movieType, event) => {
    // gets newly selected filter type
    let sortBy = event.target.value;

    // sort watched movies array by new filter
    axios({
      method: 'post',
      url: process.env.REACT_APP_SORT_MOVIES_URL,
      data: {
          sortBy: sortBy,
          movieType: movieType
      },
      withCredentials: true
    }).then((response) => {
      // update state of respective movie array
      if (movieType === "watched") this.setState({previousMovies: response.data.movies});
      else this.setState({upcomingMovies: response.data.movies});

    }).catch((error) => {
      window.alert("Unable to apply filter: " + error);
    });
  }

  updateFormat = () => {
    window.alert("starting");
    axios({
      method:'post',
      url: process.env.REACT_APP_UPDATE_FORMAT_URL,
      data:{},
      withCredentials: true
    })
  }


  render() {

    return (
      <>
      <div style={{display: this.state.imgLoaded == true ? 'grid' : 'none'}} className="App">
        <div style={{gridRow: '1', marginTop: '15px'}}>
        <h1 className="title">Selected Movie </h1>
        {this.state.isMovieSelected ? 
            <div className="motw-container borders"> 
              <h1 className="title"> {this.state.movieOTW} </h1>
              <h4> {this.state.date} </h4>
              <p> Location: <a style={{textDecoration: 'underline'}} href={process.env.REACT_APP_ZOOM_LINK}>Zoom Link</a></p>
              <p className="addedBy"> Added by {this.state.userOTW} </p>
              {this.state.noteOTW.length === 0 ? null : <p> Teaser: {this.state.noteOTW} </p>}
              <img style={{height: '45%', width: '45%'}} onLoad={() => {this.setState({imgLoaded:true})}}src={this.state.posterLink}></img> 
              <div className="description-container">
                <p style={{marginBottom: '-.5px'}}> Description: </p>
                <p> {this.state.description} </p>

                <p> Genre: {this.state.genre} | Runtime: {this.state.runtime} | Rated {this.state.rating}</p>

              </div>
            </div> 
            : 
            <p style={{textAlign: 'center'}}> No movie selected yet for this week.</p>
        }
        </div>

        <br />
        <div style={{gridRow: '1', textAlign: 'center'}}>
        <div style={{marginTop: '15px'}} className="center">
          <div style={{float: 'right'}}>
            <h1 className="title"> Statistics </h1>
            <p>Total Movies Suggested: {this.state.upcomingMovies.length + this.state.previousMovies.length} </p>
            <p>Movies Watched: {this.state.previousMovies.length} </p>
            <p>Upcoming Movies: {this.state.upcomingMovies.length} </p>
            <p>Current Pool Size: {this.state.currentPool.length} </p>
            <p>Members: 7 </p>
          </div>
        <SuggestionForm />
        <h1 style={{marginTop: '15px'}}> Current Pool </h1>
        {this.state.currentPool.map((user, i) => (
          <p key={i}> {user.suggestion} - {user.name} </p>
        ))}

        <h1 style={{marginTop: '15px'}}> Recent Updates </h1>
        {this.state.recentUpdates.map((up, i) => {
          return up.watched == true ? <p> <a style={{color: '#90EE90'}}> Movie Watched: </a> <a style={{color:'#FF7F50'}}> {up.name} </a> was watched on {formatDate(up.date)}</p> : <p key={i}> <a style={{color: 'Salmon'}}> Movie Added: </a> <a style={{color: '#87CEFA'}}> {up.addedBy} </a>recommended <a style={{color:'#FF7F50'}}> {up.name} </a> on {formatDate(up.date)}</p>
        })}

        {/*<a href='/updates'> View All >>> </a> */}
        </div>
        </div>

        <div style={{gridRow: '2', textAlign:'center'}}>
        <h1> Upcoming Movies </h1>
        <label style={{marginRight: '.5vw'}}> Sort by </label>
        <select name="Name" defaultValue="Date-Descending" onChange={(e) => {this.updateMovieSort("upcoming", e)}}>
          <option value={"recent"}>Recent First</option>
          <option value={"oldest"}>Oldest First</option>
          <option value={"name"}>Movie Name</option>
          <option disabled={true} value={"o-rating"}>Overall Ratings</option>
          <option disabled={true} value={"u-rating"}>My Ratings</option>
        </select>
        {this.state.upcomingMovies.map((movie, i) => (
          <div>
            <MovieContainer key={i} movieTitle={movie.name} teaser={movie.teaser} addedBy={movie.addedBy} dateWatched={formatDate(movie.date)} />
          </div>
        ))}
        </div>
        
        <div style={{gridRow: '2', textAlign: 'center'}}>
        <h1> Movies Watched so Far </h1>
        <label style={{marginRight: '.5vw'}}> Sort by </label>
        <select name="Name" defaultValue="Date-Descending" onChange={(e) => {this.updateMovieSort("watched", e)}}>
          <option value={"recent"}>Recent First</option>
          <option value={"oldest"}>Oldest First</option>
          <option value={"name"}>Movie Name</option>
          <option disabled={true} value={"o-rating"}>Overall Ratings</option>
          <option disabled={true} value={"u-rating"}>My Ratings</option>
        </select>
        {this.state.previousMovies.map((movie, i) => (
          <MovieContainer key={i} movieTitle={movie.name} teaser={movie.teaser} addedBy={movie.addedBy} dateWatched={formatDate(movie.date)} />
        ))}
        </div>
        <br />
        <button onClick={this.updateFormat}> Update </button>
        </div>
      </>
    );
  }
}


export default withRouter(Home);
