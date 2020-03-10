import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./AddDirectorForm.css";

class DirectorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            imageUrl: '',
            movies: [],
            movieTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddDirector(this.state);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleAddMovie(event) {
        this.setState({
            movies: this.state.movies.concat([this.state.movieTemp]), 
            movieTemp: ''
        });
    }
    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="AddDirectorForm-input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
            </div>
            <div className="AddDirectorForm-input">
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
            </div>
            <div className="AddDirectorForm-input">
                <label htmlFor="movieTemp">Movies</label>
                {this.state.movies.map((movie) => <p key={movie}>{movie}</p>)}
                <input type="text" name="movieTemp" value={this.state.movieTemp} onChange={this.onFieldChange}></input>
                <input type="button" value="+" onClick={this.handleAddMovie}></input>
            </div>
            <input type="submit" value="Add"/>
        </form>;

    }
}

function AddDirectorForm({match, onAddDirector}) {
    return <div className="AddDirectorForm">
        <h1>Add Director</h1>
        <DirectorForm onAddDirector={onAddDirector}/>
    </div>;
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddDirector: (director) => {
            dispatch({ type: 'ADD_DIRECTOR', director});
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => {}, mapDispatchToProps) (AddDirectorForm));