// Vendor
import React, { Component } from 'react';
import './App.css';
// Components
import Header from './Components/Header'
import UrlForm from './Components/UrlForm'
import Footer from './Components/Footer'

// Default http client since we are not using Redux(, etc) here.
import HttpClient from './utils/http'

class App extends Component {
    constructor() {
        super();
        this.httpClient = new HttpClient();
    }
    onSubmitCapturing = event => {
        event.preventDefault();
        const urlToSave = this.refs.urlForm.state.url;
        const isValid = this.refs.urlForm.state.valid;
        if (isValid) {
            this.httpClient.postUrl(urlToSave).then(shorten => {
                this.refs.urlForm.onSuccessWithShorten(shorten);
            });
        }
    };

  render() {
    return (
      <div className="App" onSubmitCapture={this.onSubmitCapturing}>
          <Header/>
          <UrlForm ref="urlForm"></UrlForm>
          <Footer/>
      </div>
    );
  }
}

export default App;
