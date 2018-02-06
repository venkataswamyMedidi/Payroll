import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setDefaultEmployee, setTabnerEmployees} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';

require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");

class Employees extends Component {

    componentWillMount() {
        if (this.props.main.isLogged == 'false') {
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'Authorization': localStorage.getItem('tabner_token')}
            };

            axios.get('http://' + localStorage.getItem('your_ip') + ':8090/tabneremployees', config)
                .then((response) => {
                    this.props.setTabnerEmployees(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerEmployees);
                    console.log(this.props.main.tabnerEmployees[0]);
                    this.setState({
                        employees: response.data.response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        return (
            <div>
                <div className="emptabs">
                    <a><Link to={"/employees/active"} activeStyle={{color:'red'}} onlyActiveOnIndex>Active</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/employees/inactive"} activeStyle={{color:'red'}}>Inactive</Link></a>
                </div>
                <div>
                    {this.props.children}
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);