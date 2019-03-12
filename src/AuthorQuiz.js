
import React from 'react';
import './AuthorQuiz.css';
import { Link } from 'react-router-dom';


const Hero = () => {
    return (
        <div className="jumbotron col-10 offset-1 text-left">
            <h1>Author Quiz</h1>
            <p>Select the book written by the author shown</p>
        </div>
    );
};

const Book = ({title, onClick}) => {
    return (
        <div className="answer" onClick={() => {onClick(title);}}>
            <h4>{title}</h4>
        </div>
    )
}

const Turn = ({author, books, highlight, onAnswerSelected}) => {
    const highlightToBgColor = (highlight) => {
        const mapping = {
            'none': '',
            'correct': 'green',
            'wrong': 'red'
        };
        return mapping[highlight];
    }

    return (
        <div className="row turn" style={{ backgroundColor: highlightToBgColor(highlight) }}>
            <div className="col-3 offset-1">
                <img src={author.imageUrl} className="authorimage img-responsive" alt="Author" />
            </div>
            <div className="col-7">
                {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
            </div>
        </div>
    );
};

const Continue = ({show, onContinue}) => {
    return (
        <div className="row continue">
            { show
                ? <div className="col-11">
                    <button className="btn btn-info btn-lg float-right" onClick={onContinue}>Continue</button>
                </div>
                : null}
        </div>
    );
}

const Footer = () => {
    return (
        <div id="footer" className="row">
            <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a> and are in the public domain</p>
        </div>);
}

const AuthorQuiz = ({ turnData, highlight, onAnswerSelected, onContinue }) => {
    console.log(turnData)
    return (
        <div className="container-fluid">
            <Hero />
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
            <Continue show={highlight === 'correct'} onContinue={onContinue} />
            <div className="col-10 offset-1 text-left">
                <button className="btn btn-warning add-button"><Link to="/add" className="link">Add an author</Link></button>
            </div>
            <Footer />
        </div>
    )
}

export default AuthorQuiz;