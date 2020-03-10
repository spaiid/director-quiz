import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import './App.css';
import './bootstrap.min.css';

function Hero(){
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Movie Director Quiz</h1>
      <p>Select a movie from the director shown (There may be multiple!). </p>
    </div>
  </div>
  );
}

function Movie({title, onClick}){
  return(<div className="answer" onClick={() => {onClick(title);}} >
    <h4>{title}</h4>
  </div>

  );
}

function Turn({director, movies, highlight, onAnswerSelected}){

  function highlightToBackColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return(<div className="row turn" style={{backgroundColor: highlightToBackColor(highlight)}}>
    <div className="col-2 offset-1">
      <img src={director.imageUrl} className="directorimage" alt="Director"/>
    </div>
    <div className="col-7 offset-1">
      {movies.map((title) => <Movie title={title} key={title} onClick={onAnswerSelected} />)}
    </div>
  </div>
  );
}
Turn.propTypes = {
  director: propTypes.shape({
    name: propTypes.string.isRequired,
    imageUrl: propTypes.string.isRequired,
    imageSource: propTypes.string.isRequired,
    movies: propTypes.arrayOf(propTypes.string).isRequired
  }),
  movies: propTypes.arrayOf(propTypes.string).isRequired,
  onAnswerSelected: propTypes.func.isRequired,
  highlight: propTypes.string.isRequired

};

function Continue({show, onContinue }) {
  return (
    <div className="row continue">
      { show
        ? <div className="col-11">
            <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
          </div>
          : null }
    </div>
  );
}

function Footer(){
  return(<div id="footer" className="row">
    <div className="col-3 offset-1">
      <p className="text-muted credit">
        All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a>
        </p>
    </div>
  </div>

  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer })
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' })
    }
  };
}

const DirectorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({turnData, highlight, onAnswerSelected, onContinue}) {
  return (
    <div className= "container-fluid">
      <Hero/>
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
      <Continue show={highlight === 'correct'} onContinue={onContinue}/>
      <div className="row">
        <div className="col-3 offset-1">
          <p className="addDirector"><Link to="/add">Add a director</Link></p>
        </div>
      </div>
      <Footer/>
    </div>
  );
})

export default DirectorQuiz;
