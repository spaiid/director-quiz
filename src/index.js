import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import DirectorQuiz from './DirectorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AddDirectorForm from './AddDirectorForm';

const directors = [
    {
        name: 'Christopher Nolan',
        imageUrl: 'images/directors/Christopher_nolan.jpg',
        imageSource: 'Wikimedia Commons',
        movies: ['Interstellar',
                 'The Dark Knight',
                 'Inception'
        ]
    },
    {
        name: 'Steven Spielberg',
        imageUrl: 'images/directors/Steven_Spielberg.jpg',
        imageSource: 'Wikimedia Commons',
        movies: ['Jaws',
                 'Saving Private Ryan',
                 'Indiana Jones'
        ]
    },
    {
        name: 'Quentin Tarantino',
        imageUrl: 'images/directors/Quentin_Tarantino.jpg',
        imageSource: 'Wikimedia Commons',
        movies: ['Pulp Fiction',
                 'Inglorious Basterds',
                 'Django Unchained'
        ]
    },
    {
        name: 'Guillermo del Toro',
        imageUrl: 'images/directors/Guillermo_del_Toro.jpg',
        imageSource: 'Wikimedia Commons',
        movies: ['Pan\'s Labyrinth',
                 'Kung Fu Panda',
                 'The Hobbit'
        ]
    },
    {
        name: 'David Fincher',
        imageUrl: 'images/directors/David_Fincher.jpg',
        imageSource: 'Wikimedia Commons',
        movies: ['Fight Club',
                 'Zodiac',
                 'Seven'
        ]
    }

];

function getTurnData(directors) {
    const allMovies = directors.reduce(function (p, c, i) {
        return p.concat(c.movies);
    }, []);
    const fourRandomMovies = shuffle(allMovies).slice(0,4);
    const answer = sample(fourRandomMovies);

    return {
        movies: fourRandomMovies,
        director: directors.find((director) => 
            director.movies.some((title) => 
                title === answer))
    }
}

function reducer(state = {directors, turnData: getTurnData(directors), highlight: ''},
 action) {
     switch (action.type) {
         case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.director.movies.some((movie) => movie === action.answer);
            return Object.assign(
                {}, 
                state, { 
                    highlight: isCorrect ? 'correct' : 'wrong'
                });
        case 'CONTINUE':
            return Object.assign(
                {},
                state, {
                    highlight: '',
                    turnData: getTurnData(state.directors)
                });
        case 'ADD_DIRECTOR':
                return Object.assign({},
                    state,
                    {
                        directors: state.directors.concat([action.director])
                    })
        default: return state;
     }
}

let store = Redux.createStore(reducer);

ReactDOM.render(
<BrowserRouter> 
    <ReactRedux.Provider store={store} >
        <Route exact path="/" component ={DirectorQuiz} /> 
        <Route path="/add" component={AddDirectorForm} />
    </ReactRedux.Provider>
</BrowserRouter>, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
