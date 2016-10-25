import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col} from 'react-bootstrap';
class Header extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} className="app-header" >
                        <h2 className="app-title">Save your url into a shorter one</h2>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Header
