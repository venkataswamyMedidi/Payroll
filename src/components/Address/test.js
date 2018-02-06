import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {
    login, logout, setEmployeeRates
} from '../../actions/mainActions';
import {connect} from "react-redux";

require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");

class Rates extends Component {

    constructor() {
        super();
        this.check = true;
        this.emp_id = '',
            this.first_name = '',
            this.last_name = '',
            this.emp_type = '',
            this.emp_start_date = '',
            this.emp_pay_rate = '',
            this.emp_bill_rate = '',
            this.state = {
                rates: '',
                indexToEdit: '',
                emp_type: '',
                emp_start_date: '',
                emp_pay_rate: '',
                emp_bill_rate: ''

            };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEdited = this.onEdited.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(date) {
        console.log(moment(date).format('YYYY-MM-DD').toString());
        this.emp_start_date = moment(date).format('YYYY-MM-DD').toString();
        this.setState({
            startDate: date
        });
    }

    onDateChange(date) {
        console.log('on cdate change called');
        this.emp_start_date = date.toString().replace('/', '-');
        console.log('date is printing correctly?' + this.emp_start_date);
        this.setState({
            date: date
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;
        if (name === 'emp_type') {
            console.log('type is setting to ......' + value);
            this.emp_type = value;
        } else if (name === 'emp_start_date') {
            this.emp_start_date = value;
        } else if (name === 'emp_pay_rate') {
            this.emp_pay_rate = value;
        } else if (name === 'emp_bill_rate') {
            this.emp_bill_rate = value;
        }
        this.check = false;
        this.setState({
            [name]: value.toUpperCase()
        });

    }

    componentWillMount() {
        if (this.props.main.isLogged == 'false') {
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'Authorization': localStorage.getItem('tabner_token')}
            };

            axios.get('http://' + localStorage.getItem('your_ip') + ':8090/employeerates', config)
                .then((response) => {

                    this.props.setEmployeeRates(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }


    onEdit(index) {
        this.setState({
            indexToEdit: index,
            startDate: moment(this.props.main.employeeRates[index].start_date, "YYYY-MM-DD")
        });
    }

    onReset() {
        console.log('reset called');
        this.check = true;
        this.emp_id = '',
            this.first_name = '';
        this.last_name = '',
            this.emp_type = '',
            this.emp_start_date = '',
            this.emp_pay_rate = '',
            this.emp_bill_rate = '',
            this.setState({
                indexToEdit: '',
                emp_type: '',
                emp_start_date: '',
                emp_pay_rate: '',
                emp_bill_rate: '',
                date: ''
            });
    }

    onEdited() {

        console.log(this.emp_id + '.......' + this.last_name + '........' + this.first_name + '........' + this.state.emp_type + '.......' + this.emp_start_date + '.......' + this.emp_pay_rate + '.......' + this.state.emp_bill_rate);
        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };

        axios.post('http://' + localStorage.getItem('your_ip') + ':8090/editemployeerate', {
            emp_id: this.emp_id,
            last_name: this.last_name,
            first_name: this.first_name,
            type: this.emp_type,
            start_date: this.emp_start_date,
            pay_rate: this.emp_pay_rate,
            bill_rate: this.emp_bill_rate
        }, config)
            .then((response) => {

                this.check = true;
                this.emp_id = '';
                this.first_name = '';
                this.last_name = '';
                this.emp_type = '';
                this.emp_start_date = '';
                this.emp_pay_rate = '';
                this.emp_bill_rate = '';

                this.setState({
                    indexToEdit: '',
                    emp_type: '',
                    emp_start_date: '',
                    emp_pay_rate: '',
                    emp_bill_rate: ''
                });

                this.props.setEmployeeRates(response.data.response);
                console.log(response);
                console.log('dataaaa fromm redux');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        const employee_rates = this.props.main.employeeRates.map((emprate, index) => {
            if (this.state.rates === '') {
                if (index === this.state.indexToEdit) {
                    if (this.check === true) {
                        this.emp_id = emprate.emp_id;
                        this.first_name = emprate.first_name;
                        this.last_name = emprate.last_name;
                        this.emp_type = emprate.type;
                        this.emp_start_date = emprate.start_date;
                        this.emp_pay_rate = emprate.pay_rate;
                        this.emp_bill_rate = emprate.bill_rate;
                    }

                    return <tr className="employee_hover" key={index}>
                        <td>{emprate.emp_id}</td>
                        <td>{emprate.first_name}</td>
                        <td>{emprate.last_name}</td>
                        {/*<td><input type="text" defaultValue={emprate.type} id="emp_type" name="emp_type" onChange={this.handleInputChange}/></td>*/}
                        <td><select name="emp_type" value={this.emp_type} onChange={this.handleInputChange}>
                            <option value="W2">W2</option>
                            <option value="SAL">SAL</option>
                        </select></td>
                        <td><DatePicker
                            dateFormat="YYYY/MM/DD"
                            selected={this.state.startDate}
                            onChange={this.handleChange}/></td>
                        {/* <td><input type="text" defaultValue={emprate.start_date} id="emp_start_date" name="emp_start_date"  onChange={this.handleInputChange}/></td>*/}
                        <td>{emprate.end_date}</td>
                        <td><input type="text" defaultValue={emprate.pay_rate} id="emp_pay_rate" name="emp_pay_rate"
                                   onChange={this.handleInputChange}/></td>
                        <td><input type="text" defaultValue={emprate.bill_rate} id="emp_bill_rate" name="emp_bill_rate"
                                   onChange={this.handleInputChange}/></td>
                        <td><span className="glyphicon glyphicon-ok" onClick={() => this.onEdited()}></span></td>
                        <td><span className="glyphicon glyphicon-remove" onClick={() => this.onReset()}></span></td>
                    </tr>
                } else {
                    return <tr className="employee_hover" key={index}>
                        <td>{emprate.emp_id}</td>
                        <td>{emprate.first_name}</td>
                        <td>{emprate.last_name}</td>
                        <td>{emprate.type}</td>
                        <td>{emprate.start_date}</td>
                        <td>{emprate.end_date}</td>
                        <td>{emprate.pay_rate}</td>
                        <td>{emprate.bill_rate}</td>
                        <td><span className="glyphicon glyphicon-edit" onClick={() => this.onEdit(index)}></span></td>
                    </tr>
                }

            } else {
                if ((emprate.first_name.indexOf(this.state.rates) > -1) || (emprate.last_name.toUpperCase().indexOf(this.state.rates) > -1)) {
                    if (index === this.state.indexToEdit) {
                        if (this.check === true) {
                            this.emp_id = emprate.emp_id;
                            this.first_name = emprate.first_name;
                            this.last_name = emprate.last_name;
                            this.emp_type = emprate.type;
                            this.emp_start_date = emprate.start_date;
                            this.emp_pay_rate = emprate.pay_rate;
                            this.emp_bill_rate = emprate.bill_rate;
                        }
                        return <tr className="employee_hover" key={index}>
                            <td>{emprate.emp_id}</td>
                            <td>{emprate.first_name}</td>
                            <td>{emprate.last_name}</td>
                            {/* <td><input type="text" defaultValue={emprate.type} id="emp_type" name="emp_type" onChange={this.handleInputChange}/></td>*/}
                            <td><select name="emp_type" value={this.emp_type} onChange={this.handleInputChange}>
                                <option value="W2">W2</option>
                                <option value="SAL">SAL</option>
                            </select></td>
                            <td><DatePicker
                                dateFormat="YYYY/MM/DD"
                                selected={this.state.startDate}
                                onChange={this.handleChange}/></td>
                            {/* <td><input type="text" defaultValue={emprate.start_date} id="emp_start_date" name="emp_start_date" onChange={this.handleInputChange}/></td>*/}
                            <td>{emprate.end_date}</td>
                            <td><input type="text" defaultValue={emprate.pay_rate} id="emp_pay_rate" name="emp_pay_rate"
                                       onChange={this.handleInputChange}/></td>
                            <td><input type="text" defaultValue={emprate.bill_rate} id="emp_bill_rate"
                                       name="emp_bill_rate" onChange={this.handleInputChange}/></td>
                            <td><span className="glyphicon glyphicon-ok" onClick={() => this.onEdited()}></span></td>
                            <td><span className="glyphicon glyphicon-remove" onClick={() => this.onReset()}></span></td>
                        </tr>
                    } else {
                        return <tr className="employee_hover" key={index}>
                            <td>{emprate.emp_id}</td>
                            <td>{emprate.first_name}</td>
                            <td>{emprate.last_name}</td>
                            <td>{emprate.type}</td>
                            <td>{emprate.start_date}</td>
                            <td>{emprate.end_date}</td>
                            <td>{emprate.pay_rate}</td>
                            <td>{emprate.bill_rate}</td>
                            <td><span className="glyphicon glyphicon-edit" onClick={() => this.onEdit(index)}></span>
                            </td>
                        </tr>
                    }

                } else {
                    return <tr className="employee_hover" key={index} style={{display: 'none'}}>
                        <td>{emprate.emp_id}</td>
                        <td>{emprate.first_name}</td>
                        <td>{emprate.last_name}</td>
                        <td>{emprate.type}</td>
                        <td>{emprate.start_date}</td>
                        <td>{emprate.end_date}</td>
                        <td>{emprate.pay_rate}</td>
                        <td>{emprate.bill_rate}</td>
                        <td><span className="glyphicon glyphicon-edit" onClick={() => this.onEdit(index)}></span></td>
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
                                <button className="btn btn-primary" type="button" data-toggle="modal"
                                        data-backdrop="true">Add
                                </button>
                            </div>
                            <div className="col-xs-3" style={{float: 'right', paddingRight: '0px'}}>
                                <input type="text" className="form-control" placeholder="Search for..." id="rates"
                                       name="rates"
                                       onChange={this.handleInputChange}/>
                            </div>
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Pay Rate</th>
                                    <th>Bill Rate</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {employee_rates}
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
        setEmployeeRates: (employee_rates) => {
            dispatch(setEmployeeRates(employee_rates));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);