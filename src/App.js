import React, { Component } from 'react';
import NetatmoCredentials  from './NetatmoCredentials';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-Title">Netatmo Report</h1>
        </header>
        <NetatmoCredentials/>
      </div>
    );
  }
}

export default App;
