import React, { Component } from 'react';
import '../App.css';
import {Col} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Col xs={12} className="app-header" >
                <h2 className="app-title">Tiny Url</h2>
            </Col>
        );
    }
}

export default Header
