import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} className="app-header" >
                        <h2 className="app-footer">
                            <div>
                                Made by <a href="https://zhibincai.com">Zhibin Cai</a> with <p style={{ color: "red", display: "inline" }}>♥</p>
                            </div>
                        </h2>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Footer
