// Vendor
import React, { Component } from 'react';
import './App.css';
// Components
import Header from './Components/Header'
import SaveUrlForm from './Components/saveUrlForm'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <SaveUrlForm></SaveUrlForm>
      </div>
    );
  }
}

export default App;
