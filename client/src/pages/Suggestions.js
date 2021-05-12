import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';
import formatDate from '../utils/dateFormatterUtil';
import '../css/Suggestions.css';

class Suggestions extends React.Component {
   state = {
    enteredPool: false,
    currentChoice: {},
    isLoading: true, 
    userMovies: [],
    otherMovies: []
   }

   componentDidMount() {
    axios({
        method: 'get', 
        url: "https://movieotw.herokuapp.com/loadSuggestions",
        withCredentials: true
      })
  
      .then((response) => {
        // user not signed in
        console.log(response.data.currentChoice);
        this.setState({enteredPool: response.data.enteredPool, userMovies: response.data.userMovies, otherMovies: response.data.otherMovies, currentChoice: response.data.currentChoice, isLoading: false});
  
      })
      .catch((error) => {
        window.alert("Unable to suggestions: " + error);
      })     
   } 

   deleteSuggestion = (movieName) => {
     if (window.confirm("Remove " + movieName + "?")) {
        // remove movie from database
        axios({
          method: 'post', 
          url: "https://movieotw.herokuapp.com/movie/removeSuggestion",
          data: {
            movie: movieName
          },
          withCredentials: true
        })
    
        .then((response) => {
          if (response.data.success) {
            this.setState({userMovies: this.state.userMovies.filter((movie) => { return movie.name !== movieName})});
            window.alert("Successfully removed " + movieName + ".");
          } else {
            window.alert(response.data.val);
          }
        })
        .catch((error) => {
          window.alert("Unable to suggestions: " + error);
        })     
     }
   }

   setAsNextChoice = (movie) => {
     if (movie.name === this.state.currentChoice.name && this.state.enteredPool) window.alert("Movie already set as current choice.");
     else if (window.confirm("Update current suggestion to " + movie.name + "?")) {
        this.setState({enteredPool: true});
        if (movie.name == this.state.currentChoice) {
          window.alert('hit');
          return;
        }

        // update user's current suggestion
        axios({
          method: 'post', 
          url: "http://movieotw.herokuapp.com/movie/updateSuggestion",
          data: {
            previous: this.state.currentChoice.name,
            new: movie.name
          },
          withCredentials: true
        })

        .then((response) => {
          if (response.data.success) {
            this.setState({currentChoice: movie});
          } else {
            window.alert(response.data.val);
          }
        })
        .catch((error) => {
          window.alert("Unable to suggestions: " + error);
        })   
     }
   }
   
   enterPool = () => {
    // enter user in pool
    axios({
      method: 'post', 
      url: "https://movieotw.herokuapp.com/user/enterPool",
      withCredentials: true
    })

    .then((response) => {
      if (response.data.success) {
        this.setState({enteredPool: true});
      } else {
        window.alert(response.data.val);
      }
    })
    .catch((error) => {
      window.alert("Unable to suggestions: " + error);
    })   
  }

   leavePool = () => {
     if (window.confirm("Leave current pool?")) {
      // enter user in pool
      axios({
        method: 'post', 
        url: "https://movieotw.herokuapp.com/user/leavePool",
        withCredentials: true
      })

      .then((response) => {
        if (response.data.success) {
          this.setState({enteredPool: false});
        } else {
          window.alert(response.data.val);
        }
      })
      .catch((error) => {
        window.alert("Unable to suggestions: " + error);
      })   
     }
   }

   render() {
     if (this.state.isLoading) {
       return <CustomNavbar loading={true} />
     }

    return (
        <>  
        <CustomNavbar />
        <h1 className="suggestion-title"> Current Choice </h1>
        {this.state.enteredPool == false ? 
          <div style={{textAlign: 'center'}}>
            <p> Join the pool! </p>
            <button style={{align: 'center'}} onClick={this.enterPool}> Enter Pool </button> 
          </div>
          :
          <div className="suggestion-container"> 
            <p> {this.state.currentChoice.name}</p>
            <p> Date added {formatDate(this.state.currentChoice.date)} </p>
            <p> Added by {this.state.currentChoice.addedBy} </p>
            <button onClick={() => {this.deleteSuggestion(this.state.currentChoice.name)}}> Delete </button>
            <button onClick={this.leavePool}> Leave Pool </button>
          </div>
        }
        <h1 className="suggestion-title"> My Unwatched Suggestions </h1>
        {this.state.userMovies.map((movie, i) => (
            <div key={i} className="suggestion-container">
                <p> {movie.name} </p>
                <p> Added on {formatDate(movie.date)} </p>
                <button onClick={() => {this.deleteSuggestion(movie.name)}}> Delete </button>
                <button onClick={() => {this.setAsNextChoice(movie)}}> Suggest Now </button>
            </div>
        ))}

        <h1 className="suggestion-title"> What Everyone Else Wants to Watch </h1>
        {this.state.otherMovies.map((movie, i) => (
            <div key={i} className="suggestion-container">
                <p> {movie.name} </p>
                <p> Date added {formatDate(movie.date)} </p>
                <p> Added by {movie.addedBy} </p>
                <button onClick={() => {this.setAsNextChoice(movie)}}> Suggest Now </button>
            </div>
        ))}
        </>
    );
   }
}

export default withRouter(Suggestions);