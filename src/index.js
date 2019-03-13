import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm'
import {shuffle, sample} from 'underscore';
import * as serviceWorker from './serviceWorker';

/* let model = {numberOfClicks: 0} */

let authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Mark_Twain_photo_portrait%2C_Feb_7%2C_1871%2C_cropped_Repair.jpg',
        books: ['The Adwentures of Huckleberry Finn']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/800px-Shakespeare.jpg',
        books: ['Hamlet', 'Othello', 'King Lear']
    },
    {
        name: 'Stephen King',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg',
        books: ['Pet Sematary', 'Misery']
    },
    {
        name: 'Joanne Rowling',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Jk-rowling-crop.JPG',
        books: ["Harry Potter and the Philosopher's Stone", 'Harry Potter and the Deathly Hallows']
    },
    {
        name: 'Ernest Hemingway',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/800px-ErnestHemingway.jpg',
        books: ['The Old Man and the Sea']
    }
]

const getTurnData = () => {
    const allBooks = authors.reduce (function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
}
const resetState = () => {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

const onAnswerSelected = (answer) => {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render ()
}

const Applic = () => {
    return (
        <div>
            {/* <App clicks={model.numberOfClicks} /> */}
            <AuthorQuiz {...state}
            onAnswerSelected={onAnswerSelected}
            onContinue={() => {
                state = resetState();
                render();
            }} />
        </div>
    )
}

const AuthorWrapper = withRouter(({history}) => {
    return <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />;
})

const render = () => {
ReactDOM.render(
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/" component={Applic}/>
                <Route path="/add" component={AuthorWrapper} />
            </React.Fragment>
        </BrowserRouter>,
        document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
