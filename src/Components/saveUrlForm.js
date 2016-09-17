import React, { Component } from 'react';
import '../App.css';

class SaveUrlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: false,
            url: ""
        };
    }
    handleInputChange = event => {
       this.setState({
           url: event.target.value
       });
    };
    handleSave = event => {
        this.setState({
            saving: true
        });
    };
    render() {
        let inputPlaceHolder = "Type the url you want to save...";
        return (
            <div>
                <input type="text" placeholder={inputPlaceHolder} value={this.state.url} onChange={this.handleInputChange}/>
                <button className="saveButton" onClick={this.handleSave}>Save</button>
                <p>Saving: {this.state.saving.toString()}</p>
                <p>Url: {this.state.url}</p>
            </div>
        );
    }
}

export default SaveUrlForm
