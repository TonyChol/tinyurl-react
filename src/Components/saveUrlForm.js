import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col} from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class SaveUrlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: false,
            url: ""
        };
    };
    handleInputChange = event => {
       this.setState({
           url: event.target.value,
           saving: false
       });
    };
    handleSave = event => {
        this.setState({
            saving: true
        });
    };
    getValidationState() {
        const url = this.state.url;
        if (this.validUrl(url) === true) {
            return 'success';
        }
        else {
            return 'error';
        }
    };
    validUrl(str) {
        let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(str);
    };
    render() {
        let inputPlaceHolder = "Type the url you want to save...";
        return (
            <div>
                <Grid>
                    <Row className="su-form-group">
                        <Col xs={12} md={8}>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState()}
                                >
                                    <ControlLabel>{ inputPlaceHolder }</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.url}
                                        placeholder="Enter url"
                                        onChange={this.handleInputChange}
                                    />
                                    <FormControl.Feedback />

                                </FormGroup>
                            </form>
                        </Col>

                    </Row>
                </Grid>

                {/*<button className="saveButton" onClick={this.handleSave}>Save</button>*/}
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
                <p>Saving: {this.state.saving.toString()}</p>
                <p>Url: {this.state.url}</p>
            </div>
        );
    }
}

export default SaveUrlForm
