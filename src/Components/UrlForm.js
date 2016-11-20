// Vendor
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col} from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

// Style
import '../App.css';

// Utils
import { validUrl } from '../utils/utils'

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
        if (validUrl(urlToSave) === true) { isValid = true; }
        if (validUrl(urlToSave) === false) {
            if (validUrl("http://" + urlToSave) === true) {
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

    handleSavingState = () => {
        this.setState({
            typing: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.valid) {
            this.handleSavingState();
            this.props.onFetchClick(this.state.url);
        }
    };

    getValidationState() {
        const url = this.state.url;
        if (validUrl(url) === true) {
            return 'success';
        } else {
            return (validUrl("http://" + url)? 'success': 'error');
        }
    }

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
                                            {(this.props.fetching && this.state.errorMsg.length === 0)
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

                    {(
                        !this.props.fetching &&
                        this.props.shorten.length > 0 &&
                        !this.state.typing &&
                        !this.props.error
                     )
                        ? <span>It's done! The url is: <a href={this.props.shorten}>{this.props.shorten}</a></span>
                        : <span></span>
                    }
                </div>
            </div>
        );
    }
}

export default UrlForm
