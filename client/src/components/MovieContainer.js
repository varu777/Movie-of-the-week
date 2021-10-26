import React from 'react';
import '../css/PreviousMovie.css';

class MovieContainer extends React.Component {
    state = {
        displayReviewForm: false,
        reviewSubmitted: false,
        reviewScoreInput: -1.0,
        finalReviewScore: -1.0,
        user: ''
    }

    displayReviewForm = () => {
        this.setState({ displayReviewForm: true });
    }

    cancelReview = () => {
        this.setState({ displayReviewForm: false })
    }

    updateReviewScore = (event) => {
        this.setState({ reviewScore: event.target.value });
    }

    updateUser = (event) => {
        this.setState({ user: event.target.value });
    }
    
    submitReview = () => {
        try {
            window.alert(parseFloat(this.state.reviewScore));
        } catch {
            window.alert("Error");
            return;
        }

        this.setState({reviewSubmitted: true})
        //this.setState({})
    }

    render() {
        return (
            <div className="container"> 
                <p> Movie title: {this.props.movieTitle} </p>
                <p> Suggested by: {this.props.addedBy} </p>
                <p> Watched on: {this.props.dateWatched} </p>
                {/*
                <p> Average Review: {this.props.avgReview} </p>
                <p> Review Count: {this.props.reviewCount} </p>
                <button onClick={this.displayReviewForm}> Make Review </button>
                {this.state.displayReviewForm ? 
                   <div> 
                        <label> Score (1.00-10.00): </label>
                        <input onChange={this.updateReviewScore} />

                        <label> Reviewed By: </label>
                        <select name="Name" defaultValue="Choose here" onChange={this.updateUser}>
                        <option value="Choose here" disabled hidden>Choose here</option>
                        <option value="">Felix</option>
                        <option value="">Hector</option>
                        <option value="">Jason</option>
                        <option value="">Jesse</option>
                        <option value="">Jorge</option>
                        <option value="">Juan</option>
                        <option value="">Octavio</option>
                        </select>

                        <button onClick={this.submitReview}> Submit </button> 
                        <button onClick={this.cancelReview}> Cancel </button>

                        {this.state.reviewSubmitted ? <p> Review score of {this.state.finalReviewScore} submitted </p> : null}
                   </div>
                   : 
                   null 
                }
                */
                }
            </div>
        );
    }
}

export default MovieContainer;