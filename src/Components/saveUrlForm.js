import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col} from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import reqwest from 'reqwest';

const remoteUrl = 'https://api.zbcai.xyz/url/create';
// const remoteUrl = 'http://localhost:8080/url/create';

class SaveUrlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: false,
            url: "",
            shorten: "",
            typing: false
        };
    };

    handleInputChange = event => {
       this.setState({
           url: event.target.value,
           typing: true
       });
    };

    handleSave = event => {
        this.setState({
            saving: true,
            typing: false
        });
        let that = this;
        reqwest({
            url: remoteUrl
            , method: 'post'
            , data: { url: this.state.url }
            , success: function (resp) {
                if (resp.success === true) {
                    let shortenUrl = resp.shorten;
                    that.setState({
                        shorten: shortenUrl,
                        saving: false
                    });
                }
            }, header: {
                'Content-Type': 'application/json',
            }
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
                        <Col xs={12} >
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

                <Button bsStyle="primary" onClick={this.handleSave}>
                    {this.state.saving
                        ? "Saving..."
                        : "Save"
                    }
                </Button>

                <div>
                    {(!this.state.saving && this.state.shorten.length > 0 && !this.state.typing)
                        ? <span>Shorten: <a href={this.state.shorten}>{this.state.shorten}</a></span>
                        : <span></span>
                    }
                </div>
            </div>
        );
    }
}

export default SaveUrlForm
