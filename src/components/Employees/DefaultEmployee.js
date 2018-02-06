import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import {browserHistory} from "react-router";
import {login, logout, setDefaultEmployee} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';

require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class DefaultEmployee extends Component {
    constructor() {
        super();

    }

    componentWillMount() {
        if (this.props.main.isLogged == 'false') {
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'Authorization': localStorage.getItem('tabner_token')}
            };
            console.log("user name......" + this.props.main.userName);
            axios.post('http://' + localStorage.getItem('your_ip') + ':8090/defaulttabneremployee', {
                username: this.props.main.userName
            }, config)
                .then((response) => {
                    console.log('printinig default employee');
                    console.log(response.data.response);
                    this.props.setDefaultEmployee(response.data.response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    render() {
        return (
            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Personal
                                Information</a>
                        </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div className="row">
                                <div className="col-lg-3">
                                    {/*<h4 style={{color: "#041c3d",fontSize:'16px'}}>Employee Id: <span
                                        className="label label-primary">{this.props.main.defaultEmployee.emp_id}</span>
                                    </h4>*/}
                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Employee Id:
                                        <input type="emp" name="Emp" class="form-control" placeholder="Employee Id"
                                               value={this.props.main.defaultEmployee.emp_id}/>
                                    </h4>
                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Date of Joining:
                                        <input type="emp" name="Emp" class="form-control" placeholder="Employee Id"
                                               value={this.props.main.defaultEmployee.emp_id}/>
                                    </h4>
                                </div>
                                <div className="col-lg-3">
                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>First Name:
                                        <input type="email" name="add" class="form-control" placeholder="Email address"
                                               value={this.props.main.defaultEmployee.first_name}/>
                                    </h4>
                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Email:
                                        <input type="text" name="add" class="form-control" placeholder="Last Name"
                                               value={this.props.main.defaultEmployee.email_id}/>
                                    </h4>

                                </div>
                                <div className="col-lg-3">

                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Last Name:
                                        <input type="email" name="add" class="form-control" placeholder="Email address"
                                               value={this.props.main.defaultEmployee.last_name}/>
                                    </h4>
                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Mobile Num:
                                        <input type="email" name="add" class="form-control" placeholder="Email address"
                                               value={this.props.main.defaultEmployee.mobile_num}/>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Immigration Details</a>
                        </h4>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="panel-body">
                                <div class="panel-group" id="accordion11">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion11" href="#collapse11">Passport
                                                    Details</a>
                                            </h4>
                                        </div>
                                        <div id="collapse11" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                {/*<h5 className="col-lg-4">Passport Num:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Passport" value={this.props.main.defaultEmployee.emp_id} /></h5>
                                                <h5 className="col-md-4">Issued Country:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}}  name="Issued" value={this.props.main.defaultEmployee.first_name} /></h5>
                                                <h5 className="col-md-4">Issued Date:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Date" value={this.props.main.defaultEmployee.last_name} /></h5>
                                                <h5 className="col-md-4">Expiration Date:<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Last Name" value={this.props.main.defaultEmployee.emp_id} /></h5>
 */}
                                                <div className="row">
                                                    <div className="col-lg-4">

                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Passport:
                                                            <input type="text" name="pass" class="form-control"
                                                                   placeholder="passport"
                                                                   value={this.props.main.defaultEmployee.emp_id}/>
                                                        </h4>
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Issued Country:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Issued Date"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Valid Date:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Valid Date"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Expire Date:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Expire Date"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>

                                                    </div>
                                                    {/*<div className="col-lg-6">
                                                        <h4 style={{color:"brown"}}> Mobile Num:<span className="label label-default">{this.props.main.defaultEmployee.mobile_num}</span></h4>
                                                    </div>*/}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion11" href="#collapse12">Visa
                                                    Details</a>
                                            </h4>
                                        </div>
                                        <div id="collapse12" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                {/* <h5 className="col-lg-4">Visa Number:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Visa Number" value={this.props.main.defaultEmployee.passport} /></h5>
                                                <h5 className="col-lg-4">Visa Type:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Visa" value={this.props.main.defaultEmployee.visa} /></h5>
                                                <h5 className="col-lg-4">Issued Date:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Date" value={this.props.main.defaultEmployee.last_name} /></h5>
                                                <h5 className="col-lg-4">Expiration:&nbsp;<br/><br/>
                                                    <input type="text" style={{outline:"groove",border:"1px"}} name="Date" value={this.props.main.defaultEmployee.emp_id} /></h5>
*/}
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Visa No:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Visa_no"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>
                                                        <h4 style={{color: "#041c3d"}}>Visa Status:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Visa Status"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Issued Date:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Issued Date"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>Expiry Date:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Expiry Date"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>
                                                        <h4 style={{color: "#041c3d",fontSize:"14px"}}>I94 Form:
                                                            <input type="text" name="add" class="form-control"
                                                                   placeholder="Expiry Date"
                                                                   value={this.props.main.defaultEmployee.last_name}/>
                                                        </h4>

                                                    </div>
                                                    {/* <div className="col-lg-6">
                                                        <h4 style={{color:"brown"}}> I94_Form:<span className="label label-default">{this.props.main.defaultEmployee.mobile_num}</span></h4>
                                                    </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion11" href="#collapse13">Education
                                                    Details</a>
                                            </h4>
                                        </div>
                                        <div id="collapse13" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <div className="col-lg-4">
                                                <h4 style={{color: "#041c3d",fontSize:"14px"}}>10th YearOfPass:
                                                    <input type="text" name="add" class="form-control"
                                                           placeholder="10 YearOfPass"
                                                           value={this.props.main.defaultEmployee.last_name}/>
                                                </h4>
                                                <h4 style={{color: "#041c3d",fontSize:"14px"}}>Inter YearOfPass:
                                                    <input type="text" name="add" class="form-control"
                                                           placeholder="Inter"
                                                           value={this.props.main.defaultEmployee.last_name}/>
                                                </h4>
                                                </div>
                                                <div className="col-lg-4">
                                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Under Graduate:
                                                        <input type="text" name="add" class="form-control"
                                                               placeholder="Under Graduate"
                                                               value={this.props.main.defaultEmployee.last_name}/>
                                                    </h4>

                                                <h4 style={{color: "#041c3d",fontSize:"14px"}}>Year Of Passing:
                                                    <input type="text" name="add" class="form-control"
                                                           placeholder="Year Of Passing"
                                                           value={this.props.main.defaultEmployee.last_name}/>
                                                </h4>
                                                </div>
                                                <div className="col-lg-4">
                                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Post Graduate:
                                                        <input type="text" name="add" class="form-control"
                                                               placeholder="Inter"
                                                               value={this.props.main.defaultEmployee.last_name}/>
                                                    </h4>
                                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Year Of Passing:
                                                        <input type="text" name="add" class="form-control"
                                                               placeholder="Year Of Passing"
                                                               value={this.props.main.defaultEmployee.last_name}/>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Experience Details</a>
                        </h4>
                    </div>
                    <div id="collapse3" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div className="row">
                                <div className="col-lg-6">

                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Technologies:
                                        <input type="text" name="add" class="form-control" placeholder="Technologies"
                                               value={this.props.main.defaultEmployee.last_name}/>
                                    </h4>
                                    <h4 style={{color: "#041c3d",fontSize:"14px"}}>Experience:
                                        <input type="text" name="add" class="form-control" placeholder="Years Of Exp"
                                               value={this.props.main.defaultEmployee.last_name}/>
                                    </h4>

                                </div>
                                {/*
                                <div className="col-lg-6">
                                    <h4 style={{color:"brown"}}> Issued_Date:<span className="label label-default">{this.props.main.defaultEmployee.last_name}</span></h4>
                                    <h4 style={{color:"brown"}}> Expiry_Date:<span className="label label-default">{this.props.main.defaultEmployee.email_id}</span></h4>

                                </div>*/}

                                {/*<h5 className="col-md-5">Education: {this.props.main.defaultEmployee.education}</h5>
                            <h5 className="col-md-5">Experience: {this.props.main.defaultEmployee.experience}</h5>
                            <h5 className="col-md-5">Skills: {this.props.main.defaultEmployee.skills}</h5>
*/}                        </div>
                        </div>

                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">Address Details</a>
                        </h4>
                    </div>
                    <div id="collapse4" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div className="col-lg-6">
                               {/* <h4 style={{color: "brown"}}>Addrees: <span
                                className="label label-default">{this.props.main.defaultEmployee.emp_id}</span>
   <h5 className="col-md-5">Address: {this.props.main.defaultEmployee.address}</h5>
                                    <input type="email" class="form-control" placeholder="Email address"
                                           value={this.props.main.defaultEmployee.passport}/>
                                </h4>*/}

                                <h4 style={{color: "#041c3d",fontSize:"14px"}}>Address:
                                    <input type="text" name="add" class="form-control" placeholder="Address"
                                           value={this.props.main.defaultEmployee.last_name}/>
                                </h4>
                            </div>
                        </div>
                    </div>
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
        setDefaultEmployee: (employee) => {
            dispatch(setDefaultEmployee(employee));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultEmployee);