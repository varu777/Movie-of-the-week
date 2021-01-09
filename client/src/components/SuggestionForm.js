import React from 'react';
import axios from 'axios';
import '../css/SuggestionForm.css';

class SuggestionForm extends React.Component {
    state = {
        movieSuggestion: '', 
        user: '', 
        movieNote: '' 
    };

    submitSuggestion = () => {
        if (this.state.movieSuggestion.length === 0) {
            window.alert("Movie name cannot be empty.");
            return;
        }

        if (this.state.user.length === 0) {
            window.alert("User not selected.");
            return;
        }

        const movie = this.state.movieSuggestion;
        const user = this.state.user;

        const url = "http://localhost:9000/SuggestMovie";
        axios({
            method: 'post',
            url: url,
            data: {
                movie: movie, 
                name: user,
                movieNote: this.state.movieNote
            }
        })
        .then((response) => {
        if (response.data.success) {
            this.setState({movieSuggestion:'', movieNote:''});
            window.alert("Successfully added " + response.data.val + ".\n" + "Movie ID: " + response.data.ticketNum);
        } else {
            // error occured
            window.alert(response.data.val);
        }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    updateMovie = (event) => {
        this.setState({movieSuggestion: event.target.value})
    } 

    updateUser = (event) => {
        this.setState({user: event.target.value});
    }

    updateNote = (event) => {
        this.setState({movieNote: event.target.value});
    }

    showReviewForm = () => {
        window.alert("clicked");
    }

    render() {
        return(
            <div>
                <h1> Suggest a Movie </h1>

                <label> Title: </label>
                <input value={this.state.movieSuggestion} onChange={this.updateMovie} />
                <br/>

                <label> Suggested By: </label>
                <select name="Name" defaultValue="Choose here" onChange={this.updateUser}>
                <option value="Choose here" disabled hidden>Choose here</option>
                <option value={process.env.REACT_APP_NAME_1}>{process.env.REACT_APP_NAME_1}</option>
                <option value={process.env.REACT_APP_NAME_2}>{process.env.REACT_APP_NAME_2}</option>
                <option value={process.env.REACT_APP_NAME_3}>{process.env.REACT_APP_NAME_3}</option>
                <option value={process.env.REACT_APP_NAME_4}>{process.env.REACT_APP_NAME_4}</option>
                <option value={process.env.REACT_APP_NAME_5}>{process.env.REACT_APP_NAME_5}</option>
                <option value={process.env.REACT_APP_NAME_6}>{process.env.REACT_APP_NAME_6}</option>
                <option value={process.env.REACT_APP_NAME_7}>{process.env.REACT_APP_NAME_7}</option>
                </select>
                <br/>

                <label> Teaser Note (optional): </label>
                <textarea value={this.state.movieNote} onChange={this.updateNote} />
                <br/>

                <button onClick={this.submitSuggestion}> Suggest </button>
            </div>
        );
    }
}

export default SuggestionForm;