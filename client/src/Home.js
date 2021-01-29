import React from 'react';
import './App.css';
import axios from 'axios';
import SuggestionForm from './components/SuggestionForm';
import PreviousMovie from './components/PreviousMovie';
import CustomNavbar from './components/CustomNavbar';


class Home extends React.Component {
  state = {
    isMovieSelected: false,
    movieOTW: '',
    userOTW: '', 
    noteOTW: '',
    previousMovies: [],
    currentPool: [],
    upcomingMovies: [],
    isLoading: true
  }
  
  componentDidMount () {
    // retrieve watched movies
    axios({
      method: 'get', 
      url: "http://localhost:9000/HomeData"
    })

    .then((response) => {
      // get motw data
      let movieOTWData = response.data.movieOTW;

      // display motw if it's not blank
      let isMovieSelected = (movieOTWData.watchOTW.length === 0) ? false : true;
      
      let movies = response.data.watchedMovies;
      this.setState({
        previousMovies: movies, 
        isMovieSelected: isMovieSelected,
        movieOTW: movieOTWData.watchOTW,
        userOTW: movieOTWData.addedBy, 
        noteOTW: movieOTWData.note, 
        upcomingMovies: response.data.upcomingMovies, 
        currentPool: response.data.currentPool,
        isLoading: false
      });
    })
    .catch((error) => {
      window.alert("Unable to load home data: " + error);
    })
    this.setState({isLoading: false});
  }


  render() {
    if (this.state.isLoading) {
      return <h1 style={{textAlign: 'center'}}> Loading... </h1>
    }

    return (
      <div className="App">
        <CustomNavbar />
        <h1> Selected Movie </h1>
        {this.state.isMovieSelected ? 
            <div> 
              <p> Movie of the week is {this.state.movieOTW} </p>
              <p> Added by {this.state.userOTW} </p>
              {this.state.noteOTW.length === 0 ? null : <p> Teaser: {this.state.noteOTW} </p>}
              <p> Watch it <a href="https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09
">here</a></p> 
            </div> 
            : 
            <p> No movie selected yet for this week.</p>
        }

        <h1> Current Pool </h1>
        {this.state.currentPool.map((user, i) => (
          <p key={i}> {user.suggestion} - {user.name} </p>
        ))}

        <SuggestionForm />

        <br />
        <h1> Upcoming Movies </h1>
        {this.state.upcomingMovies.map((movie, i) => (
          <div>
          <p key={i}> {movie.name} - {movie.user} </p> 
          </div>
        ))}


        <h1> Movies Watched so Far </h1>
        {this.state.previousMovies.map((movie, i) => (
          <PreviousMovie key={i} movieTitle={movie.name} teaser={movie.teaser} addedBy={movie.addedBy} dateWatched={movie.dateWatched} />
        ))}

        <p> Let me know of features or improvements you'd like to be added</p>
      </div>
    );
  }
}

export default Home;
