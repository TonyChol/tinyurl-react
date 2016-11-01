// Vendor
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col} from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

// Style
import '../App.css';

class UrlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: false,
            url: "",
            shorten: "",
            typing: false,
            errorMsg: "",
            valid: false
        };
    };

    handleInputChange = event => {
        let urlToSave = event.target.value;
        let isValid = false;
        if (this.validUrl(urlToSave) === true) { isValid = true; }
        if (this.validUrl(urlToSave) === false) {
            if (this.validUrl("http://" + urlToSave) === true) {
                urlToSave = "http://" + urlToSave;
                isValid = true;
            }
        }
       this.setState({
           url: urlToSave,
           typing: true,
           saving: false,
           valid: isValid
       });
    };

    onSuccessWithShorten = (shorten) => {
        this.setState({
            shorten: shorten,
            saving: false,
            typing: false,
            errorMsg: ""
        });
    };

    handleSaving = () => {
        this.setState({
            saving: true,
            typing: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.valid) {
            this.handleSaving();
        }
    };

    getValidationState() {
        const url = this.state.url;
        if (this.validUrl(url) === true) {
            return 'success';
        } else {
            return (this.validUrl("http://" + url)? 'success': 'error');
        }
    }

    validUrl(str) {
        let regexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regexp.test(str);
    };

    render() {
        let inputPlaceHolder = "Just enter a long url";
        return (
            <div>
                <Grid>
                    <Row className="su-form-group">
                        <form onSubmit={this.handleSubmit}>
                            <Col xs={8} sm={10} md={11} >

                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationState()}
                                    >
                                        <ControlLabel className="app__form-validator">{ inputPlaceHolder }</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.url}
                                            placeholder="Enter url"
                                            onChange={this.handleInputChange}
                                        />
                                        <FormControl.Feedback />

                                    </FormGroup>
                            </Col>

                            <Col xs={2} sm={2} md={1} >
                                <span className="app__form__btn--save--wrapper">
                                        <Button
                                            bsStyle="primary"
                                            className="app__form__btn--save"
                                            disabled={this.state.saving || !this.state.valid}
                                            type="submit"
                                        >
                                            {(this.state.saving && this.state.errorMsg.length === 0)
                                                ? "Saving..."
                                                : "Save"
                                            }
                                        </Button>
                                </span>
                            </Col>
                        </form>
                    </Row>
                </Grid>


                <div className="app__form__label--result">

                    {this.state.errorMsg
                        ? <span>{this.state.errorMsg}</span>
                        : <span></span>
                    }

                    {(!this.state.saving && this.state.shorten.length > 0 && !this.state.typing && this.state.errorMsg.length === 0)
                        ? <span>It's done! The url is: <a href={this.state.shorten}>{this.state.shorten}</a></span>
                        : <span></span>
                    }
                </div>
            </div>
        );
    }
}

export default UrlForm
