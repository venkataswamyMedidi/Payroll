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

class InactiveEmployees extends Component {

    constructor() {
        super();
        this.state = {
            employees: Object,
            emp: '',
            filters: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);
        this.onFilter = this.onFilter.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'text' ? target.value : target.value;
        const name = target.name;

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

            axios.get('http://' + localStorage.getItem('your_ip') + ':8090/inactiveemployees', config)
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

    onEmployeeSelect(index) {
        this.props.setDefaultEmployee(this.props.main.tabnerEmployees[index]);
    }

    onFilter(e) {
        this.setState({filters: e.filters});
    }

    newMethod(e) {
        if(e.data !== null){
            this.setState({selectedemployee: e.data});
            for (var i = 0; i < this.props.main.tabnerEmployees.length; i++) {
                if (e.data.emp_id === this.props.main.tabnerEmployees[i].emp_id) {
                    this.props.setDefaultEmployee(this.props.main.tabnerEmployees[i]);
                }
            }
        }
    }

    displaySelection(employees) {

        console.log('printing selectedd employee....' + employees);
        if (!employees || employees.length === 0) {
            return <div style={{textAlign: 'left', clear: 'left'}}></div>;
        }
        else {
            if (employees instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{employees.map((employees, i) => <li
                    key={employees.emp_id}>{employees.emp_id + ' - ' + employees.first_name + ' - ' + employees.email_id + ' -' + employees.mobile_num + ' - ' + employees.ssn + ' - ' + employees.doj + ' - ' + employees.terminated_date}</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected
                    Employee: {employees.emp_id}>{employees.emp_id + ' - ' + employees.first_name + ' - ' + employees.email_id + ' -' + employees.mobile_num + ' - ' + employees.ssn + ' - ' + employees.doj + ' - ' + employees.terminated_date}</div>
        }

    }

    render() {
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
                        <h4 style={{color: "#2b1491", display: 'inline'}}> Inactive Employees</h4>
                    </div>
                </div>
                <div className="content-section implementation" style={{marginTop: '2em'}}>
                    <DataTable value={this.props.main.tabnerEmployees} reorderableColumns={true} resizableColumns={true}
                               columnResizeMode="fit"
                               globalFilter={this.state.globalFilter} filters={this.state.filters}
                               onFilter={this.onFilter} ref={(el) => {
                        this.dt = el;
                    }}
                               paginator={true} rows={10}
                               selectionMode="single"
                        /*footer={this.displaySelection(this.state.selectedemployee)}*/
                               selection={this.state.selectedemployee}
                               onSelectionChange={(e) => {this.newMethod(e)}}
                               style={{width: '100%'}} metaKeySelection={false}>
                        <Column columnKey="emp_id" field="emp_id" header="Employee ID"
                                sortable={true}/>
                        <Column columnKey="first_name" field="first_name" header="First Name"
                                sortable={true}/>
                        <Column columnKey="last_name" field="last_name" header="Last Name"
                                sortable={true}/>
                        <Column columnKey="email_id" field="email_id" header="Email" sortable={true}/>
                        <Column columnKey="mobile_num" field="mobile_num" header="Mobile"
                                sortable={true}/>
                        <Column columnKey="ssn" field="ssn" header="SSN"
                                sortable={true}/>
                        <Column columnKey="doj" field="doj" header="Date of Joining" sortable={true}/>
                        <Column columnKey="terminated_date" field="terminated_date" header="Terminated date" sortable={true}/>
                    </DataTable>
                </div>
{/*
                <div className="container-fluid">
                    <div className="">
                        <div className="row box" style={{margin: '8px'}}>
                            <div className="col-md-4 ">
                                <h4>{this.props.main.defaultEmployee.first_name}, {this.props.main.defaultEmployee.last_name}</h4>
                                  <div className="col-md-4 horizontal">
                                <h2>Compensation</h2>
                            </div>
                            </div>

                            <div className="col-md-4 vertical ">
                                <br/>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(InactiveEmployees);