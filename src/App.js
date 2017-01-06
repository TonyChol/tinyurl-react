// Vendor
import React, { Component } from 'react';
import './App.css';
// Components
import Header from './components/Header'
import Footer from './components/Footer'
// Containers
import URlFormWrapper from './containers/UrlFormWrapper'

class App extends Component {

  render() {
    return (
      <div className="App" onSubmitCapture={this.onSubmitCapturing}>
          <Header/>
          <URlFormWrapper></URlFormWrapper>
          <Footer/>
      </div>
    );
  }
}

export default App;
