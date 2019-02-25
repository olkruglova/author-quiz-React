import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
/* describe ('when setting up testing', () => {
  it ('should be failed', () => {
    expected(1+1).toBe(3);
  });
}); */
