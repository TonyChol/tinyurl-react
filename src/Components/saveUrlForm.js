import React, { Component } from 'react';
import '../App.css';

class SaveUrlForm extends Component {
    render() {
        let inputPlaceHolder = "Type the url you want to save...";
        return (
            <div>
                <input type="text" placeholder={inputPlaceHolder}/>
                <button className="saveButton">Save</button>
            </div>
        );
    }
}

export default SaveUrlForm
