import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import axios from 'axios';

class WatchedMovie extends React.Component {
    state = {
        movieName: '',
        movies: [],
        selectedMovie: 'Choose Movie',
        loading: true
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: "http://localhost:9000/movie/getMovies",
            withCredentials: true
        }).then((response) => {
            if (response.data.success) 
                this.setState({movies: response.data.movies});

        }).catch((error) => {window.alert(error)});

        this.setState({loading: false});
    }

    handleChange = (event) => {
        this.setState({selectedMovie: event.target.value});
    }

    submitWatched = () => {
        if (this.state.selectedMovie === 'Choose Movie') {
            window.alert("Invalid movie.");
            return;
        }
            
        axios({
            method: 'post', 
            url: 'http://localhost:9000/movie/watchedMovie',
            data: {
                movie: this.state.selectedMovie
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.success) {
                window.alert("Added " + this.state.selectedMovie + " to watched list.");
                this.setState({movies: this.state.movies.filter(movie => movie.name.trim() !== this.state.selectedMovie)});
                this.setState({selectedMovie: 'Choose Movie'});
            } else {
                window.alert(response.data.val);
            }

        }).catch((error) => {window.alert(error)});

    }

    render() {
        if (this.state.loading) {
            return <></>;
        }

        return (
            <>
            <h1> Movie Name </h1>
            <select value={this.state.selectedMovie} onChange={this.handleChange}> 
                <option selected disabled> Choose Movie </option>
                {this.state.movies.map((movie) => (
                    <option> {movie.name} </option>
                ))}
            </select>
            <button onClick={this.submitWatched}> Submit </button>

            <br/>

 
           
            </>
        );
    }
}

export default WatchedMovie;