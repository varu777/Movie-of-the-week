import React from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';
import '../css/Suggestions.css';

class Suggestions extends React.Component {
   state = {
       movies: []
   }

   componentDidMount() {
    axios({
        method: 'get', 
        url: "http://localhost:9000/loadSuggestions",
        withCredentials: true
      })
  
      .then((response) => {
        // user not signed in
        if (response.data.isLoggedIn != null && !response.data.isLoggedIn) {
          this.props.history.push('/login');
          return;
        }

        this.setState({movies: response.data.movies});
  
      })
      .catch((error) => {
        window.alert("Unable to suggestions: " + error);
      })     
   } 

   render() {
       return (
            <>  
            <CustomNavbar />
            <h1 className="suggestion-title"> My Suggestions </h1>
            {this.state.movies.map((movie, i) => (
                <div className="suggestion-container">
                    <p key={i}> {movie.name} - {movie.date} </p>
                    <button> Delete </button>
                </div>
            ))}
            </>
       );
   }
}

export default Suggestions;