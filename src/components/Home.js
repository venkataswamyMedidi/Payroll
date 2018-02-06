import React from 'react';
import {Component} from 'react';

import Background from '../images/background.jpg';

var sectionStyle = {

    backgroundImage: "url(" + Background + ")",
    height: '700px',
    backgroundSize : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    marginRight : '0px',
    padding: '0px'
};

export default class Home extends Component {
    render() {
        return(
            <div>
            <div style={sectionStyle}>
            </div>
            </div>
        );
    }
}