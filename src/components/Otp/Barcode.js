import React from 'react';
import {Component} from 'react';
import { browserHistory} from "react-router";
import {login, logout, setUserRole} from '../../actions/mainActions';
import {connect} from "react-redux";
import axios from "axios/index";

 class Barcode extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     componentWillMount() {
         if (this.props.main.beforeLogin == 'false') {
             browserHistory.push("/home");
         }
     }

     handleSubmit(event) {
         this.props.login();

         var config = {
             headers: {'Authorization': localStorage.getItem('tabner_token')}
         };

         axios.post('http://'+localStorage.getItem('your_ip')+':8090/userrole',{
             username: this.props.main.userName
         }, config)
             .then((response) => {
                 this.props.setUserRole(response.data.response);
                 console.log(response.data.response);
                 console.log('dataaaa fromm redux');
                 console.log(".....totp........"+this.props.main.userRole);
                 localStorage.removeItem('tabner_secret');
                 browserHistory.push("/employees/active") ;

             })
     }

     render() {
        return(
            <div className='container'>
               <div style={{textAlign: 'center', padding: '50px'}}>
                   <img src={localStorage.getItem('tabner_secret')}/>
                   <h4 style= {{color: 'black'}}>please install google authenticator app in your mobile, scan the above QR code and click the below button to continue </h4>
                   <button className='btn btn-primary' onClick = {this.handleSubmit.bind(this)}>Continue</button>
               </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        main: state.main

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch(login());
        },
        logout: () => {
            dispatch(logout());
        },
        setUserRole: (role) => {
            dispatch(setUserRole(role));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Barcode);