import React , {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setTabnerInvoices} from '../../actions/mainActions';
import {connect} from "react-redux";

import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class Invoices extends Component {

    constructor() {
        super();
        this.state = {
            invoices: Object,
            inv: '',
            filters: {}
        }

    }




    componentWillMount() {
        if (this.props.main.isLogged == 'false') {
            browserHistory.push("/home");
        } else {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };
            axios.get('http://' + localStorage.getItem('your_ip') + ':8090/tabnerinvoices', config)
                .then((response) => {
                    this.props.setTabnerInvoices(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerInvoices);
                    console.log(this.props.main.tabnerInvoices[0]);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    onFilter(e) {
        this.setState({filters: e.filters});
    }


    render() {

        return(


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
                        <h4 style={{color: "#2b1491", display: 'inline'}}> Employee Invoices </h4>
                    </div>
                </div>
                <div className="content-section implementation" style={{marginTop: '2em'}}>
                    <DataTable value={this.props.main.tabnerInvoices} reorderableColumns={true} resizableColumns={true}
                               columnResizeMode="fit"
                               globalFilter={this.state.globalFilter} filters={this.state.filters}
                               onFilter={this.onFilter} ref={(el) => {
                        this.dt = el;
                    }}
                               paginator={true} rows={5}
                               selectionMode="single"
                        /*footer={this.displaySelection(this.state.selectedemployee)}*/
                               selection={this.state.selectedInvoice}
                               onSelectionChange={(e) => {this.setState({selectedInvoice:e.data})}}
                               style={{width: '100%'}} metaKeySelection={false}>
                        <Column columnKey="inv_id" field="inv_id" header="Invoice Number"
                                sortable={true}/>
                        {/* <Column columnKey="emp_id" field="emp_id" header="Employee ID"
                                sortable={true}/>*/}
                        <Column columnKey="emp_name" field="emp_name" header="Employee Name"
                                sortable={true}/>
                        {/* <Column columnKey="vendor_id" field="vendor_id" header="Vendor ID"
                                sortable={true}/>*/}
                        <Column columnKey="vendor_name" field="vendor_name" header="Vendor Name"
                                sortable={true}/>
                        <Column columnKey="hours" field="hours" header="Hours"
                                sortable={true}/>
                        <Column columnKey="amount" field="amount" header="Amount"
                                sortable={true}/>
                        <Column columnKey="start_date" field="start_date" header="Start Date"
                                sortable={true}/>
                        <Column columnKey="end_date" field="end_date" header="End Date"
                                sortable={true}/>
                    </DataTable>
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
        setTabnerInvoices: (invoices) => {
            dispatch(setTabnerInvoices(invoices));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);