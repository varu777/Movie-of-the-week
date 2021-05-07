import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import axios from 'axios';

class UpdateMovie extends React.Component {
    state = {
        movieName: '',
        addedBy: '',
        teaser: '',
        description: '',
        rating: '',
        runtime: '',
        genre: '',
        posterLink: ''
    }

    updateMovieName = (event) => {
        this.setState({movieName: event.target.value});
    }

    updateAddedBy = (event) => {
        this.setState({addedBy: event.target.value});
    }

    updateTeaser = (event) => {
        this.setState({teaser: event.target.value});
    }

    updateDescription = (event) => {
        this.setState({description: event.target.value});
    }

    updateRating = (event) => {
        this.setState({rating: event.target.value});
    }

    updateRuntime = (event) => {
        this.setState({runtime: event.target.value});
    }

    updateGenre = (event) => {
        this.setState({genre: event.target.value});
    }

    updatePosterLink = (event) => {
        this.setState({posterLink: event.target.value});
    }

    submitUpdateMovie = () => {
        axios({
            method: 'post',
            url: "http://localhost:9000/movie/updateMovie",
            data: {
                movieName: this.state.movieName,
                addedBy: this.state.addedBy,
                teaser: this.state.teaser,
                description: this.state.description,
                rating: this.state.rating,
                runtime: this.state.runtime,
                genre: this.state.genre,
                posterLink: this.state.posterLink
            },
            withCredentials: true
          }).then((response) => {
            if (response.data.success) {
                window.alert("Movie of the week updated.")
            } else {
                window.alert("Unable to update movie of the week.")
            }
          }).catch((error) => {
            window.alert("Error updating movie: " + error);
          });
    }

    render() {
        return (
            <>
            <CustomNavbar />
            <h1> Movie Name </h1>
            <input value={this.state.movieName} onChange={this.updateMovieName} /> 
            <br/>

            <h1> Added By </h1>
            <input value={this.state.addedBy} onChange={this.updateAddedBy} /> 
            <br/>

            <h1> Teaser </h1>
            <input value={this.state.teaser} onChange={this.updateTeaser} /> 
            <br/>

            <h1> Description </h1>
            <input value={this.state.description} onChange={this.updateDescription} /> 
            <br/>

            <h1> Rating </h1>
            <input value={this.state.rating} onChange={this.updateRating} /> 
            <br/>

            <h1> Runtime </h1>
            <input value={this.state.runtime} onChange={this.updateRuntime} /> 
            <br/>

            <h1> Genre </h1>
            <input value={this.state.genre} onChange={this.updateGenre} /> 
            <br/>

            <h1> Poster Link</h1>
            <input value={this.state.posterLink} onChange={this.updatePosterLink} /> 
            <br/>
            <br/>
            <button onClick={this.submitUpdateMovie}>Update Movie</button>
            </>
        );
    }
}

export default UpdateMovie