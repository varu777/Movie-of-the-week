import React from 'react';
import './App.css';
import axios from 'axios';
import SuggestionForm from './components/SuggestionForm';
import PreviousMovie from './components/PreviousMovie';
require('dotenv').config()

class App extends React.Component {
  state = {
    isMovieSelected: false,
    movieOTW: '',
    userOTW: '', 
    noteOTW: '',
    previousMovies: [],
    isLoading: true,
  }
  
  componentDidMount () {
    // retrieve watched movies
    axios({
      method: 'get', 
      url: 'https://movieotw.herokuapp.com/HomeData'
    })
    .then((response) => {
      window.alert(response);
      console.log(response);
      // get motw data
      let movieOTWData = response.data.movieOTW;
      console.log(movieOTWData);
      console.log(movieOTWData.movieOTW);
      let movieOTW = movieOTWData.movieOTW;
      let userOTW = movieOTWData.addedBy;
      let teaser = movieOTWData.note;

      // display motw if it's not blank
      let isMovieSelected = (movieOTWData.movieOTW.length === 0) ? false : true;
      
      let movies = response.data.movies;
      this.setState({previousMovies: movies, isLoading: false, isMovieSelected: isMovieSelected, movieOTW: movieOTW, userOTW: userOTW, noteOTW: teaser});
    })
    .catch((error) => {
      window.alert("Unable to load previous movies: " + error);
    })
  }


  render() {
    if (this.state.isLoading) {
      return <h1 style={{textAlign: 'center'}}> Loading... </h1>
    }

    return (
      <div className="App">
        <h1> Movie Of The Week (In Dev)</h1>
        {this.state.isMovieSelected ? 
            <div> 
              <p> Movie of the week is: {this.state.movieOTW} </p>
              <p> Added by: {this.state.userOTW} </p>
              {this.state.noteOTW.length === 0 ? null : <p> Teaser: {this.state.noteOTW} </p>}
              <p> Watch it <a href="#">Here</a></p> 
            </div> 
            : 
            <p> No movie selected yet for this week.</p>
        }

        <SuggestionForm />

        <h1> Movies Watched so Far </h1>
        {this.state.previousMovies.map((movie, i) => (
          <PreviousMovie key={i} movieTitle={movie.name} teaser={movie.teaser} addedBy={movie.addedBy} dateWatched={movie.dateWatched} />
        ))}
      </div>
    );
  }
}

export default App;
