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
              <h4> March 6, 2021</h4>
              <p> Location: <a style={{textDecoration: 'underline'}}href="https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09">Zoom Theatre</a></p> 
              <p className="addedBy"> Added by {this.state.userOTW} </p>
              {this.state.noteOTW.length === 0 ? null : <p> Teaser: {this.state.noteOTW} </p>}
              <img style={{height: '45%', width: '45%'}} src="https://m.media-amazon.com/images/M/MV5BOGRlZTdhOGYtODc5NS00YmJkLTkzN2UtZDMyYmRhZWM1NTQwXkEyXkFqcGdeQXVyMzU4Nzk4MDI@._V1_SX300.jpg"></img> 
              <div className="description-container">
                <p style={{marginBottom: '-.5px'}}> Description: </p>
                <p> Sexual deviant Frank (Sean Chapman) inadvertently opens a portal to hell when he tinkers with a box he bought while abroad. The act unleashes gruesome beings called Cenobites, who tear Frank's body apart. When Frank's brother (Andrew Robinson) and his wife, Julia (Clare Higgins), move into Frank's old house, they accidentally bring what is left of Frank back to life. Frank then convinces Julia, his one-time lover, to lure men back to the house so he can use their blood to reconstruct himself. </p>

                <p> Genre: Horror, Thriller | Runtime: 94 min | Rated R</p>

              </div>
            </div> 
            : 
            <p style={{textAlign: 'center'}}> No movie selected yet for this week.</p>
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
