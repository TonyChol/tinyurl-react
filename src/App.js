// Vendor
import React, { Component } from 'react';
import './App.css';
// Components
import Header from './Components/Header'
import URlFormWrapper from './containers/UrlFormWrapper'
import Footer from './Components/Footer'

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
