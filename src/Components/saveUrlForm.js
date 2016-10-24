// Vendor
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col} from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import reqwest from 'reqwest';
// Style
import '../App.css';
// Helper
import { debounce } from '../utils/utils'

// ------------------------------------------------------
// Initialize
const remoteUrl = 'https://api.zbcai.xyz/url/create';
// const remoteUrl = 'http://localhost:8080/url/create';

class SaveUrlForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saving: false,
            url: "",
            shorten: "",
            typing: false,
            errorMsg: ""
        };
    };

    handleInputChange = event => {
       this.setState({
           url: event.target.value,
           typing: true,
           saving: false
       });
    };

    handleSave = event => {
        this.setState({
            saving: true,
            typing: false
        });
        let that = this;
        let urlToSave = this.state.url;
        if (this.validUrl(this.state.url) === false) {
            if (this.validUrl("http://" + this.state.url) === true) {
                urlToSave = "http://" + urlToSave;
            } else {
                this.setState({
                    errorMsg: "The url is not valid, please check again."
                });
                return;
            }
        }

        let postUrl = () => {
            reqwest({
                url: remoteUrl
                , method: 'post'
                , data: { url: urlToSave }
                , success: function (resp) {
                    if (resp.success === true) {
                        let shortenUrl = resp.shorten;
                        that.setState({
                            shorten: shortenUrl,
                            saving: false,
                            errorMsg: ""
                        });
                    }
                }, header: {
                    'Content-Type': 'application/json',
                }
            });
        };

        postUrl();
    };

    getValidationState() {
        const url = this.state.url;
        if (this.validUrl(url) === true) {
            return 'success';
        } else {
            return (this.validUrl("http://" + url)? 'success': 'error');
        }
    };

    validUrl(str) {
        let regexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regexp.test(str);
    };

    render() {
        let inputPlaceHolder = "Type the url you want to save...";
        return (
            <div>
                <Grid>
                    <Row className="su-form-group">
                        <Col xs={10} sm={10} md={11} >
                            <form>
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
                            </form>
                        </Col>
                        <Col xs={2} sm={2} md={1} >
                            <span className="app__form__btn--save--wrapper">
                                    <Button bsStyle="primary" className="app__form__btn--save" onClick={this.handleSave} disabled={this.state.saving}>
                                        {(this.state.saving && this.state.errorMsg.length === 0)
                                            ? "Saving..."
                                            : "Save"
                                        }
                                    </Button>
                            </span>
                        </Col>
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

export default SaveUrlForm
