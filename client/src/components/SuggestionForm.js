import React from 'react';
import axios from 'axios';
import '../css/SuggestionForm.css';

class SuggestionForm extends React.Component {
    state = {
        movieSuggestion: '', 
    };

    submitSuggestion = () => {
        const movie = this.state.movieSuggestion;

        if (movie.length === 0) {
            window.alert("Movie name cannot be empty.");
            return;
        }

        axios({
            method: 'post',
            url: process.env.REACT_APP_SUGGEST_MOVIE_URL,
            data: {
                movie: movie.trim(), 
            },
            withCredentials: true
        })
        .then((response) => {
            let data = response.data;
            if (data.success) {
                this.setState({ movieSuggestion: '' });
                window.alert("Successfully added " + data.val + ".\n" + "Movie ID: " + data.movieIdx);
            } else {
                window.alert(data.val);
            }

        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateMovie = (event) => {
        this.setState({ movieSuggestion: event.target.value })
    } 

    updateUser = (event) => {
        this.setState({ user: event.target.value });
    }

    showReviewForm = () => {
        window.alert("clicked");
    }

    render() {
        return(
            <div>
                <h1> Suggest a Movie </h1>

                <label style={{ marginRight: '1vw' }}> Movie Title: </label>
                <input value={ this.state.movieSuggestion } onChange={ this.updateMovie } />
                <br/>

                <button onClick={ this.submitSuggestion }> Suggest </button>
            </div>
        );
    }
}


export default SuggestionForm;