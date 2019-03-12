import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';


const ClickyButtons = ({numberOfButtons, onSelection}) => {
  const makeButton = v =>
    <button className="btn btn-primary clicky-btn" key={v} id={v} onClick={event => onSelection(event.target.id)}>
      {v}
    </button>;
  return <div>
          <div className="row">
            <h2>Clicky Buttons</h2><br/>
          </div>
          <div className="buttons">
            {_.range(1, numberOfButtons + 1).map(makeButton)}
          </div>
        </div>;
}
class App extends Component {
  state = {
    clicks: 0,
  }

  increaseNumberOfClicks = () => {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  };

  render() {
    return (
      <div>
        <div className='row text-center example1'>
          <h2 className='header1'>Button clicker</h2>
          <button className='btn btn-success one-button' onClick={this.increaseNumberOfClicks}>Clicked {this.state.clicks} times</button>
        </div>
        <hr />
        <div>
          <ClickyButtons numberOfButtons={99} onSelection={alert}/>
        </div>
        <hr />
      </div>
    )
  }
}

export default App;
