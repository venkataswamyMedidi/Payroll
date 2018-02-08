import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setDefaultEmployee, setTabnerEmployees} from '../../actions/mainActions';
import {connect} from "react-redux";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");
const MY_API_KEY = "AIzaSyCoOFNGyhS0qoHWtvbQJX-v1g0LlWG4KP4";
const tab = require('../../images/tabner.jpeg');


class ActiveEmployees extends Component {

    constructor() {
        super();
        this.line1 = '',
            this.line2 = '',
            this.line3 = '',
            this.line4 = '',
            this.state = {
                employees: Object,
                emp: '',
                search: "",
                value: "",
                filters: {},
                country:'',
                region:''


            }
        this.handleInputChange = this.handleInputChange.bind(this);
/*
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);
*/
        this.onFilter = this.onFilter.bind(this);
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

        this.setState({
            [name]: value.toUpperCase(),
            search: target.value,
            value: target.value
        });

    }

    handleSelectSuggest(suggest) {
        console.log(suggest)
        this.setState({search: "", value: suggest.formatted_address})
    }

    handleSelectSuggest(suggest) {
        console.log(suggest.formatted_address) // eslint-disable-line
        var add_split = suggest.formatted_address.split(', ');
        if (add_split.length === 4) {
            this.line4 = add_split[add_split.length - 1];
            this.line3 = add_split[add_split.length - 2];
            this.line2 = add_split[add_split.length - 3];
            this.line1 = add_split[add_split.length - 4];
        }
        if (add_split.length === 5) {
            this.line4 = add_split[add_split.length - 1];
            this.line3 = add_split[add_split.length - 2];
            this.line2 = add_split[add_split.length - 3];
            this.line1 = add_split[add_split.length - 5] + ', ' + add_split[add_split.length - 4];
        }
        if (add_split.length === 6) {
            this.line4 = add_split[add_split.length - 1];
            this.line3 = add_split[add_split.length - 2];
            this.line2 = add_split[add_split.length - 3];
            this.line1 = add_split[add_split.length - 6] + ', ' + add_split[add_split.length - 5] + ', ' + add_split[add_split.length - 4];
        }
        this.setState({search: "", value: suggest.formatted_address})


    }

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

    componentDidMount() {
        this.setState({
            employees: this.props.main.tabnerEmployees.slice()
        });
    }

   /* onEmployeeSelect(index) {
        this.props.setDefaultEmployee(this.props.main.tabnerEmployees[index]);
    }*/

    onFilter(e) {
        this.setState({filters: e.filters});
    }

    newMethod(e) {
        if (e.data !== null) {
            this.setState({selectedemployee: e.data});
            for (var i = 0; i < this.props.main.tabnerEmployees.length; i++) {
                if (e.data.emp_id === this.props.main.tabnerEmployees[i].emp_id) {
                    this.props.setDefaultEmployee(this.props.main.tabnerEmployees[i]);
                }
            }
        }
    }


    selectCountry (val) {
        this.setState({ country: val });

    }



    selectRegion (val) {
        this.setState({ region: val });

    }



    handleCreateEmployee(event) {
        event.preventDefault();
        console.log(this.state.emp_id + this.state.first_name + this.state.last_name + this.state.email_id + this.state.mobile_num + this.state.passport + this.state.visa + this.state.education + this.state.experience + this.state.skills + this.state.address);

        var config = {
            headers: {'tabner_token': localStorage.getItem('tabner_token')}
        };
        axios.post('http://' + localStorage.getItem('your_ip') + ':8090/TabnerEmployeePayroll/newemployee', {
            emp_id: this.state.emp_id,
            doj: this.state.doj,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email_id: this.state.email_id,
            mobile_num: this.state.mobile_num,
            pass_no: this.state.pass_no,
            issue_country: this.state.issue_country,
            pass_vali: this.state.pass_vali,
            pass_exp: this.state.pass_exp,
            visa_no: this.state.visa_no,
            visa_sts: this.state.visa_sts,
            visa_issu: this.state.visa_issu,
            visa_exp: this.state.visa_exp,
            i94_no: this.state.i94_no,
            yop_10: this.state.yop_10,
            inter_yop: this.state.inter_yop,
            ug_yop: this.state.ug_yop,
            g_yop: this.state.g_yop,
            skills: this.state.skills,
            work_exp: this.state.work_exp,
            address: this.state.address
        }, config)
            .then((response) => {
                this.props.setTabnerEmployees(response.data.response);
                console.log(response);
                this.setState({
                    employees: response.data.response
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    displaySelection(employees) {

        console.log('printing selectedd employee....' + employees);
        if (!employees || employees.length === 0) {
            return <div style={{textAlign: 'left', clear: 'left'}}></div>;
        }
        else {
            if (employees instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{employees.map((employees, i) => <li
                    key={employees.emp_id}>{employees.emp_id + ' - ' + employees.first_name + ' - ' + employees.email_id + ' -' + employees.mobile_num + ' - ' + employees.ssn + ' - ' + employees.doj}</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected
                    Employee: {employees.emp_id}>{employees.emp_id + ' - ' + employees.first_name + ' - ' + employees.email_id + ' -' + employees.mobile_num + ' - ' + employees.ssn + ' - ' + employees.doj}</div>
        }

    }


    rowExpansionTemplate(data) {
        var src = "tab" + data.brand + ".jpeg";

        return <div className="ui-g ui-fluid">
            <div className="ui-g-12 ui-md-3" style={{textAlign: 'center', borderRight: '1px solid #cccccc'}}>
                <img src={src} alt={data.brand}/>
            </div>
            <div className="ui-g-12 ui-md-9">
                <div className="ui-g">
                    <div className="ui-md-2">Employee:</div>
                    <div className="ui-md-10" style={{fontWeight: 'bold'}}>{data.emp_id}</div>

                    <div className="ui-md-2">First Name:</div>
                    <div className="ui-md-10" style={{fontWeight: 'bold'}}>{data.first_name}</div>

                    <div className="ui-md-2">Last Name:</div>
                    <div className="ui-md-10" style={{fontWeight: 'bold'}}>{data.last_name}</div>

                    <div className="ui-md-2">Email Id:</div>
                    <div className="ui-md-10" style={{fontWeight: 'bold'}}>{data.email_id}</div>
                </div>
            </div>
        </div>;
    }

    emailTemplate(rowData, column) {
        let email = rowData.email_id;
        let color='blue'
        return <a href="mailto:{email}"><span style={{color:color}}>{email}</span></a>
    }

    render() {
        const {search, value} = this.state;

        const { country, region } = this.state;

        return (

            <div className="container-fluid box">
                <div className=" right-inner-addon pull-right">
                    <form id="demo-2">
                        <i className="glyphicon glyphicon-search" style={{margin: '1px 1px 0 0'}}></i>
                        <input type="search" onInput={(e) => this.setState({globalFilter: e.target.value})}
                               placeholder="Employee Search"/>
                    </form>
                </div>
                <div className="pull-left control-group">
                    <div className="control-group" style={{padding: '10px'}}>
                        <i className="glyphicon glyphicon-user"></i>
                        <h4 style={{color: "#2b1491", display: 'inline'}}> Active Employees</h4>
                    </div>
                </div>
                <div className="content-section implementation" style={{marginTop: '2em'}}>
                    <DataTable value={this.props.main.tabnerEmployees} resizableColumns={true} columnResizeMode="fit"
                               reorderableColumns={true}
                               globalFilter={this.state.globalFilter} filters={this.state.filters}
                               onFilter={this.onFilter} ref={(el) => {
                        this.dt = el;
                    }}
                               paginator={true} rows={10}
                               selectionMode="single"
                        /*footer={this.displaySelection(this.state.selectedemployee)}*/
                               selection={this.state.selectedemployee}
                               onSelectionChange={(e) => {
                                   this.newMethod(e)
                               }}
                               style={{width: '100%'}} metaKeySelection={false}
                               expandedRows={this.state.expandedRows}
                               onRowToggle={(e) => this.setState({expandedRows: e.data})}
                               rowExpansionTemplate={this.rowExpansionTemplate}>
                        <Column expander={true} style={{width: '2em'}}/>
                        <Column columnKey="emp_id" field="emp_id" header="Employee ID"
                                sortable={true}/>
                        <Column columnKey="first_name" field="first_name" header="First Name"
                                sortable={true}/>
                        <Column columnKey="last_name" field="last_name" header="Last Name"
                                sortable={true}/>
                        <Column columnKey="email_id" field="email_id" header="Email" body={this.emailTemplate}sortable={true}/>
                        <Column columnKey="mobile_num" field="mobile_num" header="Mobile"
                                sortable={true}/>
                        <Column columnKey="ssn" field="ssn" header="SSN"
                                sortable={true}/>
                        <Column columnKey="doj" field="doj" header="Date of Joining" sortable={true}/>
                    </DataTable>
                </div>
                <div className="container-fluid">
                    <div className="">
                        <div className="row box" style={{margin: '8px'}}>
                            <div className="col-md-3 ">
                                <h4>{this.props.main.defaultEmployee.first_name} {this.props.main.defaultEmployee.last_name}</h4>
                                {/*  <div className="col-md-4 horizontal">
                                <h2>Compensation</h2>
                            </div>*/}
                            </div>

                            <div className="col-md-9 vertical">
                                <br/>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="personalDetails" role="dialog">
                    <div className="modal-dialog" role="document" autocomplete="off" disabled>
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <h3 className="modal-title" style={{float: 'left'}}>Personal Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        style={{float: 'right', fontsize: '1.5rem'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">Employee ID:</label>
                                            <input type="text" className="form-control" placeholder="EMPLOYEE ID"
                                                   id="emp_id" name="emp_id"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">DateOfJoin:</label>
                                            <input type="date" className="form-control" placeholder="DateOfJoin"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange} ></input>

                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">First Name:</label>
                                            <input type="text" className="form-control" placeholder="FIRST NAME"
                                                   id="first_name" name="first_name"
                                                   onChange={this.handleInputChange} />
                                        </div>
                                        <div class="form-group  col-md-6">
                                            <label htmlFor="emp_name">Last Name:</label>
                                            <input type="text" placeholder="LAST NAME" className="form-control"
                                                   id="last_name" name="last_name"
                                                   onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div class="form-group  col-md-6">
                                            <label htmlFor="emp_name">Email:</label>
                                            <input type="email" placeholder="EMAIL" className="form-control"
                                                   id="email_id" name="email_id"
                                                   pattern="[a-z.]*[@]\btabnergc.com"
                                                   oninvalid="setCustomValidity('please enter your tabnergc id')"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="emp_name">Mobile:</label>
                                            <input type="text" placeholder="MOBILE NUMBER" className="form-control"
                                                   id="mobile_num" name="mobile_num"
                                                   pattern="\d{10}" onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <div className=" ">
                                {/*<span type="button" className="glyphicon glyphicon-circle-arrow-left" data-dismiss="modal"  data-toggle = "modal" data-target = "#personalDetails"></span> &nbsp;*/}
                                <span type="submit" className="glyphicon glyphicon-circle-arrow-right" data-dismiss="modal"
                              style={{fontSize:"24px"}}   data-toggle="modal" data-target="#passportDetails">
                                </span>
                                </div>
{/*
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="passportDetails" tabindex="-1" role="dialog"
                     aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Passport
                                    Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">PassPort No:</label>
                                            <input type="text" placeholder="PASSPORT NUMBER" className="form-control"
                                                   id="passport" name="passport"
                                                   onChange={this.handleInputChange} />
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label htmlFor="emp_name">Issued Country:</label>
                                            {/* <input type="text" placeholder="Issued Country" className="form-control"
                                                   id="pass" name="pass"
                                                   onChange={this.handleInputChange} required/>
                                            */}

                                            <CountryDropdown style={{fontsize:"35px"}}
                                                             value={country}
                                                             onChange={(val) => this.selectCountry(val)} />
                                            {/*
                                            <RegionDropdown
                                                country={country}
                                                value={region}
                                                onChange={(val) => this.selectRegion(val)} />
*/}
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">Issued Date:</label>
                                            <input type="date" className="form-control" placeholder="Issued Date"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange} required/>

                                        </div>
                                    </div>
                                    <div class="form-row">
                                        {/*<div class="form-group col-md-6">
                                            <label htmlFor="emp_name">Issued Date:</label>
                                            <input type="date" className="form-control" placeholder="Issued Date"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange} required/>

                                        </div>*/}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="emp_name">Expiry Date:</label>
                                            <input type="date" className="form-control" placeholder="Expiry Date"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange} required/>
                                        </div>





                                        <div className="row">
                                            <div className="col-xs-3"></div>
                                            <div className="col-xs-6">
                                                <p style={{
                                                    color: 'white',
                                                    textAlign: 'center'
                                                }}>{this.state.messageForCreateEmployee}</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className=" ">
                                    <span type="button" className="glyphicon glyphicon-circle-arrow-left" data-dismiss="modal"  data-toggle = "modal" data-target = "#personalDetails"
                                          style={{fontSize:"24px"}} ></span> &nbsp;
                                    <span type="submit" className="glyphicon glyphicon-circle-arrow-right" data-dismiss="modal"
                                          style={{fontSize:"24px"}}   data-toggle="modal" data-target="#visaDetails">
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="visaDetails" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Visa Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">Visa No:</label>
                                            <input type="text" placeholder="VISA NUMBER" className="form-control"
                                                   id="passport" name="passport"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="emp_name">Visa Status:</label>
                                            <select class="form-control" id="visa">
                                                <option>F1</option>
                                                <option>H1</option>
                                                <option>H4 EAD</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="emp_name">Issued Date:</label>
                                            <input type="date" className="form-control" placeholder="Issued Date"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange} required/>

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="emp_name">Expiry Date:</label>
                                            <input type="date" className="form-control" placeholder="Expiry Date"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="emp_name">I94 NO:</label>
                                        <input type="text" placeholder="I94 NUMBER" className="form-control"
                                               id="passport" name="passport"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className="">
                                    <span type="button" className="glyphicon glyphicon-circle-arrow-left" data-dismiss="modal"  data-toggle = "modal" data-target = "#passportDetails"
                                          style={{fontSize:"24px"}} ></span> &nbsp;
                                    <span type="submit" className="glyphicon glyphicon-circle-arrow-right" data-dismiss="modal"
                                          style={{fontSize:"24px"}}   data-toggle="modal" data-target="#educationDetails">
                                </span>
                                </div>
{/*
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="educationDetails" tabindex="-1" role="dialog"
                     aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Education
                                    Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="terminated_date">10th YearOfPass:</label>
                                            <input type="date" className="form-control" placeholder="YearofPassing"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange}></input>

                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="terminated_date">Inter YearOfPass:</label>
                                            <input type="date" className="form-control" placeholder="YearofPassing"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="visa">UnderGraduate:</label>
                                            <select class="form-control" id="visa">
                                                <option disabled selected value> -- select --</option>
                                                <option>Btech</option>
                                                <option>Msc</option>
                                                <option>Bcom</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="visa">YearOfPassing:</label>
                                            <input type="date" className="form-control" placeholder="YearofPassing"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label htmlFor="visa">Graduaton:</label>
                                            <select class="form-control" id="visa">
                                                <option disabled selected value> -- select --</option>
                                                <option>Masters</option>
                                                <option>MCA</option>

                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="visa">YearOfPassing:</label>
                                            <input type="date" className="form-control" placeholder="YearofPassing"
                                                   name="terminated_date"
                                                   onChange={this.handleInputChange}></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className=" ">
                                    <span type="button" className="glyphicon glyphicon-circle-arrow-left" data-dismiss="modal"  data-toggle = "modal" data-target = "#visaDetails"
                                          style={{fontSize:"24px"}} ></span> &nbsp;
                                    <span type="submit" className="glyphicon glyphicon-circle-arrow-right" data-dismiss="modal"
                                          style={{fontSize:"24px"}}   data-toggle="modal" data-target="#experienceDetails">
                                </span>
                                </div>
                                {/*<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="experienceDetails" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <h3 className="modal-title" style={{float: 'left'}}>Experience Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        style={{float: 'right', fontsize: '1.5rem'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="form-group col-md-10">
                                        <label htmlFor="emp_name">Technologies:</label>
                                        <input type="text" className="form-control" placeholder="Technology" id="emp_id"
                                               name="emp_id"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div class="form-group col-md-10">
                                        <label htmlFor="emp_name">Years Of Exp:</label>
                                        <input type="text" className="form-control" placeholder="Years Of Exp"
                                               id="emp_id" name="emp_id"
                                               onChange={this.handleInputChange} required/>

                                    </div>
                                    <div className="row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className="">
                                    <span type="button" className="glyphicon glyphicon-circle-arrow-left" data-dismiss="modal"  data-toggle = "modal" data-target = "#educationDetails"
                                          style={{fontSize:"24px"}} ></span> &nbsp;
                                    <span type="submit" className="glyphicon glyphicon-circle-arrow-right" data-dismiss="modal"
                                          style={{fontSize:"24px"}}   data-toggle="modal" data-target="#addAddress">
                                </span>
                                </div>
                                {/*<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="addAddress" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                     aria-hidden="true" autocomplete="off" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}} >Address</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="form-group">
                                        <ReactGoogleMapLoader id="addressId"
                                                              params={{
                                                                  key: MY_API_KEY,
                                                                  libraries: "places,geocode",
                                                              }}
                                                              render={googleMaps =>
                                                                  googleMaps && (
                                                                      <ReactGooglePlacesSuggest
                                                                          googleMaps={googleMaps}
                                                                          autocompletionRequest={{input: search,}}
                                                                          onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                                          textNoResults="My custom no results text"
                                                                          customRender={prediction => (
                                                                              <div className="customWrapper">
                                                                                  {prediction ? prediction.description : "My custom no results text"}
                                                                              </div>
                                                                          )}>
                                                                          <input type="text" value={value}
                                                                                 placeholder="ADDRESS"
                                                                                 className="form-control" id="address"
                                                                                 name="address"
                                                                                 onChange={this.handleInputChange.bind(this)}
                                                                                 required/>
                                                                      </ReactGooglePlacesSuggest>)}>
                                        </ReactGoogleMapLoader>
                                    </div>

                                    <div className="container-fluid"
                                         style={{width: '400px', color: '#8349aa', fontSize: '14px'}}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <h4 style={{color: '#d8b945'}}> Address_Line1:</h4><input type="text"
                                                                                                    name="address"
                                                                                                    value={this.line1.split(' ')[0]}/>
                                                <h4 style={{color: '#d8b945'}}> City :</h4>
                                                <input type="text" name="city" value={this.line2}/>

                                                <h4 style={{color: '#d8b945'}}> ZipCode :</h4><input type="text"
                                                                                                     name="country"
                                                                                                     value={this.line3.split(' ')[0]}/>


                                            </div>

                                            <div className="col-lg-6">
{/*
                                                <h4 style={{color: '#d8b945'    }}>Address_Line2:<input type="text" name="add" /></h4>
*/}

                                                <h4 style={{color: '#d8b945'}}> Address_Line2:</h4><input type="text"
                                                                                                    name="address"
                                                                                                    value={this.line1.slice(4,-2)}/>


                                                <h4 style={{color: '#d8b945'}}> State :</h4><input type="text"
                                                                                                   name="state"
                                                                                                   value={this.line3.split(' ')[0]}/>

                                                <h4 style={{color: '#d8b945'}}> Country :</h4>
                                                <input type="text" name="city" value={this.line4}/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6"></div>
                                        <div className="col-xs-6">
                                            <p style={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>


                                </form>
                            </div>

                            {/*
                            <div className="container-fluid"
                                 style={{width: '400px', color: 'blue', fontSize: '15px'}}>
                                <div className="row">
                                <div className="col-md-6">
                                Address:<input type="text" name="address" value={this.line1}/>
                                </div>
                                <div className="col-md-6">
                                City : <input type="text" name="city" value={this.line2}/>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                State :<input type="text" name="state" value={this.line3}/>
                                    </div>
                                    <div className="col-md-6">
                                Country :<input type="text" name="country" value={this.line4}/>
                                    </div>
                                </div>
                            </div>
*/}


                            <div className="modal-footer">
                                <div className="pull-left">
                                <span type="submit" className="glyphicon glyphicon-circle-arrow-left" data-dismiss="modal"
                                      style={{fontSize:"24px"}}   data-toggle="modal" data-target="#experienceDetails">
                                </span>
                                </div>

                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal"
                                        onClick={this.handleCreateEmployee.bind(this)}>ADD
                                </button>
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
        setTabnerEmployees: (employees) => {
            dispatch(setTabnerEmployees(employees));
        },
        setDefaultEmployee: (employee) => {
            dispatch(setDefaultEmployee(employee));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveEmployees);