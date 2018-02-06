import React, {Component} from "react"
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setDefaultEmployee, setTabnerEmployees} from '../../actions/mainActions';
import {connect} from "react-redux";
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
const MY_API_KEY = "AIzaSyCoOFNGyhS0qoHWtvbQJX-v1g0LlWG4KP4"
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");
class TabnerEmployees extends Component {

    constructor(){
        super();
        this.state = {
            employees: Object,
            emp: '',
            emp_id: '',
            first_name: '',
            last_name: '',
            email_id: '',
            mobile_num: '',
            passport: '',
            visa: '',
            education: '',
            experience: '',
            skills: '',
            address: '',
            vendor_name: '',
            messageForCreateEmployee: '',
            search: "",
            value: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);
        this.handleCreateEmployee = this.handleCreateEmployee.bind(this);
        this.generateEmployeesInvoices = this.generateEmployeesInvoices.bind(this);
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

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'Authorization': localStorage.getItem('tabner_token')}
            };

            axios.get('http://'+localStorage.getItem('your_ip')+':8080/tabneremployees', config)
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

    componentDidMount(){
        this.setState({
            employees: this.props.main.tabnerEmployees.slice()
        });
    }

    handleCreateEmployee(event) {
        event.preventDefault();
        console.log(this.state.emp_id + this.state.first_name + this.state.last_name + this.state.email_id + this.state.mobile_num + this.state.passport + this.state.visa + this.state.education + this.state.experience + this.state.skills + this.state.address);

        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };
        axios.post('http://' + localStorage.getItem('your_ip') + ':8080/newemployee', {
            emp_id: this.state.emp_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email_id: this.state.email_id,
            mobile_num: this.state.mobile_num,
            passport: this.state.passport,
            visa: this.state.visa,
            education: this.state.education,
            experience: this.state.experience,
            skills: this.state.skills,
            address: this.state.address,
            vendor_name: this.state.vendor_name
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


    onEmployeeSelect(index){
        this.props.setDefaultEmployee(this.props.main.tabnerEmployees[index]);
    }

    generateEmployeesInvoices(event){
        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };
        axios.post('http://' + localStorage.getItem('your_ip') + ':8080/newemployee', {
                emp_id: this.state.emp_id},
            config)

    }

    render() {
        const {search, value} = this.state;

        const employees = this.props.main.tabnerEmployees.map((employee, index) => {
            if(this.state.emp === ''){
                return   <tr className="employee_hover" key={index}>
                    <td>{employee.emp_id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email_id}</td>
                    <td>{employee.mobile_num}</td>
                    <td>{employee.passport}</td>
                    <td>{employee.visa}</td>
                    <td>{employee.education}</td>
                    <td>{employee.experience}</td>
                    <td>{employee.skills}</td>
                    <td>{employee.address}</td>
                    <td>{employee.vendor_name}</td>
                </tr>
            } else {
                if(employee.last_name.indexOf(this.state.emp) > -1 || employee.first_name.indexOf(this.state.emp) > -1){
                    return   <tr className="employee_hover" key={index}>
                        <td>{employee.emp_id}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email_id}</td>
                        <td>{employee.mobile_num}</td>
                        <td>{employee.passport}</td>
                        <td>{employee.visa}</td>
                        <td>{employee.education}</td>
                        <td>{employee.experience}</td>
                        <td>{employee.skills}</td>
                        <td>{employee.address}</td>
                        <td>{employee.vendor_name}</td>
                    </tr>
                } else {
                    return   <tr className="employee_hover" key={index} style={{display: 'none'}}>
                        <td>{employee.emp_id}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email_id}</td>
                        <td>{employee.mobile_num}</td>
                        <td>{employee.passport}</td>
                        <td>{employee.visa}</td>
                        <td>{employee.education}</td>
                        <td>{employee.experience}</td>
                        <td>{employee.skills}</td>
                        <td>{employee.address}</td>
                        <td>{employee.vendor_name}</td>
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
                                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#personalDetails">Add Employee</button>
                            </div>
                            <div className="add-btn" style={{float: 'left'}}>
                                <button className="btn btn-primary" type="button">Generate Invoices</button>
                            </div>
                            <div className="col-xs-3" style={{float:'right', paddingRight: '0px'}}>
                                <input type="text" className="form-control"  placeholder="Search for..." id="emp" name="emp"
                                       onChange={this.handleInputChange}/>
                            </div>
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>Passport</th>
                                    <th>Visa</th>
                                    <th>Education</th>
                                    <th>Experience</th>
                                    <th>Skills</th>
                                    <th>Address</th>
                                    <th>Vendor Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {employees}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="personalDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel" style={{float: 'left'}}>Personal Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{float: 'right', fontsize: '1.5rem'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="EMPLOYEE ID" id= "emp_id" name="emp_id"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="FIRST NAME" id= "first_name" name="first_name"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="LAST NAME" className="form-control" id="last_name" name="last_name"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" placeholder="EMAIL" className="form-control" id="email_id" name="email_id"
                                               pattern="[a-z.]*[@]\btabnergc.com" oninvalid="setCustomValidity('please enter your tabnergc id')"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="MOBILE NUMBER" className="form-control" id="mobile_num" name="mobile_num"
                                               pattern="\d{10}" onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="VENDOR NAME" className="form-control" id="vendor_name" name="vendor_name"
                                               onChange={this.handleInputChange} required/>
                                    </div>

                                    <div className = "row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" data-toggle = "modal" data-target="#immigrationDetails">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="immigrationDetails" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Immigration Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder="PASSPORT NUMBER" className="form-control" id="passport" name="passport"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="VISA" className="form-control" id="visa" name="visa"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className = "row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" data-toggle = "modal" data-target = "#educationDetails" >Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="educationDetails" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Education Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder="EDUCATION" className="form-control" id="education" name="education"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="EXPERIENCE" className="form-control" id="experience" name="experience"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="SKILLS" className="form-control" id="skills" name="skills"
                                               onChange={this.handleInputChange} required/>
                                    </div>
                                    <div className = "row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" data-toggle = "modal" data-target = "#addAddress">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addAddress" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalLabel" style={{float: 'left'}}>Address</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" style={{float: 'right'}}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <ReactGoogleMapLoader id = "addressId"
                                                              params={{
                                                                  key: MY_API_KEY,
                                                                  libraries: "places,geocode",
                                                              }}
                                                              render={googleMaps =>
                                                                  googleMaps && (
                                                                      <ReactGooglePlacesSuggest
                                                                          googleMaps={googleMaps} autocompletionRequest={{input: search,}}
                                                                          onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                                          textNoResults="My custom no results text"
                                                                          customRender={prediction => (<div className="customWrapper">
                                                                                  {prediction ? prediction.description : "My custom no results text"}
                                                                              </div>
                                                                          )} >
                                                                          <input type="text" value={value} placeholder="ADDRESS" className="form-control" id="address" name="address"
                                                                                 onChange={this.handleInputChange.bind(this)} required/>
                                                                      </ReactGooglePlacesSuggest> )}>
                                        </ReactGoogleMapLoader>
                                    </div>
                                    <div className = "row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForCreateEmployee}</p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={this.handleCreateEmployee.bind(this)}>Save Details</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TabnerEmployees);