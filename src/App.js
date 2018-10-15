import React, { Component } from 'react';
import './App.css';
import ImportData from './containers/ImportData/ImportData';


class App extends Component { 
  render() {    
    return (
      <div className="App">
        <h1>Reactjs porfolio block</h1>        
        <ImportData />
      </div>
    );
  }
}

export default App;
