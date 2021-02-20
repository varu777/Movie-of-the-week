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
      url: "https://movieotw.herokuapp.com/HomeData"
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
  
  updateWatchedSort = (event) => {
    // gets newly selected filter type
    let sortBy = event.target.value;

    // sort watched movies array by new filter
    axios({
      method: 'post',
      url: "https://movieotw.herokuapp.com/SortWatched",
      data: {
          sortBy: sortBy
      }
    }).then((response) => {
      this.setState({previousMovies: response.data.movies});
    }).catch((error) => {
      window.alert("Unable to apply filter: " + error);
    });
  }


  render() {
    if (this.state.isLoading) {
      return <h1 className="title"> Loading... </h1>
    }

    return (
      <div className="App">
        <CustomNavbar />
        <h1 className="title">Selected Movie </h1>
        {this.state.isMovieSelected ? 
            <div className="motw-container borders"> 
              <h1 className="title"> {this.state.movieOTW} </h1>
              <h4> February 19, 2021</h4>
              <p> Location: <a href="https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09">Zoom Theatre</a></p> 
              <p className="addedBy"> Added by {this.state.userOTW} </p>
              {this.state.noteOTW.length === 0 ? null : <p> Teaser: {this.state.noteOTW} </p>}
              <img style={{height: '45%', width: '45%'}} src="https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"></img> 
              <div className="description-container">
                <p style={{marginBottom: '-.5px'}}> Description: </p>
                <p> Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family. </p>
              </div>
            </div> 
            : 
            <p> No movie selected yet for this week.</p>
        }

        <div className="center">

        <SuggestionForm />

        <h1 > Current Pool </h1>
        {this.state.currentPool.map((user, i) => (
          <p key={i}> {user.suggestion} - {user.name} </p>
        ))}

        <h1> Upcoming Movies </h1>
        {this.state.upcomingMovies.map((movie, i) => (
          <div>
          <p key={i}> {movie.name} - {movie.user} </p> 
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
          <PreviousMovie className="watched-container" key={i} movieTitle={movie.name} teaser={movie.teaser} addedBy={movie.addedBy} dateWatched={movie.dateWatched} />
        ))}
        <br />
      </div>
      </div>
    );
  }
}

export default Home;
