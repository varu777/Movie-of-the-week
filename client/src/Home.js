import React from 'react';
import './App.css';
import axios from 'axios';
import { withRouter } from 'react-router';
import SuggestionForm from './components/SuggestionForm';
import PreviousMovie from './components/PreviousMovie';
import CustomNavbar from './components/CustomNavbar';
import formatDate from './utils/dateFormatterUtil';


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
    isLoading: true,
    loggedIn: false
  }
  
  componentDidMount () {
    // retrieve watched movies
    axios({
      method: 'get', 
      url: "https://movieotw.herokuapp.com/HomeData",
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
        description: movieOTWData.description,
        upcomingMovies: response.data.upcomingMovies, 
        currentPool: response.data.currentPool,
        isLoading: false,
        imgLoaded: false 
      });
      console.log(movieOTWData.addedBy);
    })
    .catch((error) => {
      window.alert("Unable to load home data: " + error);
    })

    this.setState({loggedIn: this.context});
  }
  
  updateWatchedSort = (event) => {
    // gets newly selected filter type
    let sortBy = event.target.value;

    // sort watched movies array by new filter
    axios({
      method: 'post',
      url: "https://movieotw.herokuapp.com/SortWatched",
      data: {
          sortBy: sortBy
      },
      withCredentials: true
    }).then((response) => {
      this.setState({previousMovies: response.data.movies});
    }).catch((error) => {
      window.alert("Unable to apply filter: " + error);
    });
  }


  render() {

    return (
      <>
      <div style={{display: this.state.imgLoaded == true ? 'block' : 'none'}} className="App">
        <h1 className="title">Selected Movie </h1>

        {this.state.isMovieSelected ? 
            <div className="motw-container borders"> 
              <h1 className="title"> {this.state.movieOTW} </h1>
              <h4> {this.state.date} </h4>
              <p> Location: <a style={{textDecoration: 'underline'}}href="https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09">Zoom Theatre</a></p> 
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

        <div className="center">
        <h1> Statistics </h1>
        <p>Total Movies Suggested: {this.state.upcomingMovies.length + this.state.previousMovies.length} </p>
        <p>Movies Watched: {this.state.previousMovies.length} </p>
        <p>Upcoming Movies: {this.state.upcomingMovies.length} </p>
        <p>Current Pool Size: {this.state.currentPool.length} </p>
        <p>Members: 7 </p>

        <SuggestionForm />

        {/*
        <h1 > Current Pool </h1>
        {this.state.currentPool.map((user, i) => (
          <p key={i}> {user.suggestion} - {user.name} </p>
        ))}*/}

        <h1> Upcoming Movies </h1>
        {this.state.upcomingMovies.map((movie, i) => (
          <div>
          <p key={i}> {movie.name} - {movie.addedBy} </p> 
          </div>
        ))}

        <h1> Movies Watched so Far </h1>
        <label style={{marginRight: '.5vw'}}> Sort by </label>
        <select name="Name" defaultValue="Date-Descending" onChange={this.updateWatchedSort}>
        <option value={"recent"}>Recent First</option>
        <option value={"oldest"}>Oldest First</option>
        <option value={"name"}>Movie Name</option>
        <option disabled={true} value={"o-rating"}>Overall Ratings</option>
        <option disabled={true} value={"u-rating"}>My Ratings</option>
        </select>
        {this.state.previousMovies.map((movie, i) => (
          <PreviousMovie className="watched-container" key={i} movieTitle={movie.name} teaser={movie.teaser} addedBy={movie.addedBy} dateWatched={formatDate(movie.date)} />
        ))}
        <br />
      </div>
      </div>
      </>
    );
  }
}


export default withRouter(Home);
