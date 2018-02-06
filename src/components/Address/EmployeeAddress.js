import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {
    login, logout, setEmployeeAddress
} from '../../actions/mainActions';
import {connect} from "react-redux";
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class EmployeeAddress extends Component {

    constructor(){
        super();
        this.state = {
            empadd: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

        this.setState ({
            [name]: value.toUpperCase()
        }) ;

    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'Authorization': localStorage.getItem('tabner_token')}
            };

            axios.get('http://'+localStorage.getItem('your_ip')+':8080/employeeaddress', config)
                .then((response) => {
                    this.props.setEmployeeAddress(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {

        const employee_address = this.props.main.employeeAddress.map((empaddress, index) => {
            if(this.state.empadd === ''){
                return   <tr className="employee_hover" key={index}>
                    <td>{empaddress.emp_id}</td>
                    <td>{empaddress.eff_dt}</td>
                    <td>{empaddress.end_dt}</td>
                    <td>{empaddress.addr_line_1}</td>
                    <td>{empaddress.addr_line_2}</td>
                    <td>{empaddress.city}</td>
                    <td>{empaddress.state_cd}</td>
                    <td>{empaddress.cntry_cd}</td>
                    <td>{empaddress.zip_cd}</td>
                </tr>
            } else {
                if(empaddress.emp_id.indexOf(this.state.empadd) > -1){
                    return   <tr className="employee_hover" key={index}>
                        <td>{empaddress.emp_id}</td>
                        <td>{empaddress.eff_dt}</td>
                        <td>{empaddress.end_dt}</td>
                        <td>{empaddress.addr_line_1}</td>
                        <td>{empaddress.addr_line_2}</td>
                        <td>{empaddress.city}</td>
                        <td>{empaddress.state_cd}</td>
                        <td>{empaddress.cntry_cd}</td>
                        <td>{empaddress.zip_cd}</td>
                    </tr>
                } else {
                    return   <tr className="employee_hover" key={index} style={{display: 'none'}}>
                        <td>{empaddress.emp_id}</td>
                        <td>{empaddress.eff_dt}</td>
                        <td>{empaddress.end_dt}</td>
                        <td>{empaddress.addr_line_1}</td>
                        <td>{empaddress.addr_line_2}</td>
                        <td>{empaddress.city}</td>
                        <td>{empaddress.state_cd}</td>
                        <td>{empaddress.cntry_cd}</td>
                        <td>{empaddress.zip_cd}</td>
                    </tr>
                }
            }

        });

        return (
            <div className="container">
                <div className="table-div">
                    <div className="row justify-content-center">
                        <div className="col align-self-center">
                            <div className="add-btn" style={{float: 'left'}}>
                                <button className="btn btn-primary" type="button" data-toggle="modal" data-backdrop="false">Add</button>
                            </div>
                            <div className="col-xs-3" style={{float:'right', paddingRight: '0px'}}>
                                <input type="text" className="form-control"  placeholder="Search for..." id="empadd" name="empadd"
                                       onChange={this.handleInputChange}/>
                            </div>
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Address Line 1</th>
                                    <th>Address Line 2</th>
                                    <th>City</th>
                                    <th>State Code</th>
                                    <th>Country Code</th>
                                    <th>Zip Code</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employee_address}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div>
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
        setEmployeeAddress: (employee_address) => {
            dispatch(setEmployeeAddress(employee_address));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAddress);