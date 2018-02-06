import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {login, logout, setTabnerVendors, deleteVendor} from '../../actions/mainActions';
import {connect} from "react-redux";

import {InputText} from 'primereact/components/inputtext/InputText';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Button} from 'primereact/components/button/Button';

require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class Vendors extends Component {
    constructor() {
        super();
        this.state = {
            vendors: Object,
            van: '',
            filters: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onVendorSelect = this.onVendorSelect.bind(this);
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
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };
            axios.get('http://' + localStorage.getItem('your_ip') + ':8090/tabnervendors', config)
                .then((response) => {
                    this.props.setTabnerVendors(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerVendors);
                    console.log(this.props.main.tabnerVendors[0]);
                    this.setState({
                        vendors: response.data.response
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    handleCreateVendor(event){
        event.preventDefault();
        console.log(this.state.id_number + this.state.name + this.state.reg_state + this.state.invoice_freq + this.state.payment_freq + this.state.city);

        var config = {
            headers: {'tabner_token': localStorage.getItem('tabner_token')}
        };
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/newvendor', {
            id_number: this.state.id_number,
            name : this.state.name,
            reg_state : this.state.reg_state,
            invoice_freq: this.state.invoice_freq,
            payment_freq: this.state.payment_freq,
            address_line_1: this.state.address_line_1,


        }, config)
            .then((response) => this.ifGotResponseFromCreateVendor(response))
            .catch(function (error) {
                console.log(error);
            });
    }

    ifGotResponseFromCreateVendor(response) {
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);

            browserHistory.push("/home");
            browserHistory.push("/loggedIn");

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* The given Vendor details already exists'
            });
        }

    }

    onVendorSelect(index){
        var alert_msg = window.confirm("Are you sure you want to delete?");
        if(alert_msg) {
            var config = {
                headers: {'tabner_token': localStorage.getItem('tabner_token')}
            };
            axios.post('http://'+localStorage.getItem('your_ip')+':8090/deletevendor', {
                id_number: this.props.main.tabnerVendors[index].id_number
            }, config)
                .then((response) => this.ifGotResponseFromDeleteVendor(response, index))
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    ifGotResponseFromDeleteVendor(response, index){
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);
            this.props.deleteVendor(index);

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* Something went wrong'
            });
        }
    }


    onFilter(e) {
        this.setState({filters: e.filters});
    }

    /*
        newMethod(e) {
            if (e.data !== null) {
                this.setState({selectedvendor: e.data});
                for (var i = 0; i < this.props.main.tabnerVendors.length; i++) {
                    if (e.data.id_number === this.props.main.tabnerVendors[i].id_number) {
                        this.props.setDefaultEmployee(this.props.main.tabnerVendors[i]);
                    }
                }
            }
        }
    */

    displaySelection(vendors) {
        if (!vendors || vendors.length === 0) {
            return <div style={{textAlign: 'left'}}></div>;
        }
        else {
            if (vendors instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{vendors.map((vendors, i) => <li
                    key={vendors.id_number}>{vendors.id_number + ' - ' + vendors.name + ' - ' + vendors.reg_state + ' -' + vendors.invoice_freq + ' - ' + vendors.payment_freq + ' - ' + vendors.address_line_1}</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Selected
                    Vendors: {/*{vendors.id_number}>*/}{vendors.id_number + ' - ' + vendors.name + ' - ' + vendors.reg_state + ' -' + vendors.invoice_freq + ' - ' + vendors.payment_freq + ' - ' + vendors.address_line_1}</div>
        }
    }


    render() {

        return (
            <div>
                <div className="container-fluid box">
                        <div className="right-inner-addon pull-right">
                            <form id="demo-2">
                                <i className="glyphicon glyphicon-search" style={{margin: '1px 1px 0 0'}}></i>
                                <input type="search" onInput={(e) => this.setState({globalFilter: e.target.value})}
                                       placeholder="Vendor Search"/>
                            </form>
                        </div>

                        <div className="pull-left control-group">
                            <div className="control-group" style={{padding: '10px'}}>
                                <i className="glyphicon glyphicon-user"></i>
                                <h4 style={{color: "#2b1491", display:'inline'}}> Vendors</h4>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="content-section implementation">
                                <DataTable value={this.state.vendors} reorderableColumns={true}  columnResizeMode="fit"
                                           globalFilter={this.state.globalFilter} filters={this.state.filters}
                                           onFilter={this.onFilter} /*ref={(e1) =>{
                                                   this.dt.e1;
                                    }}*/
                                           paginator={true} rows={10}
                                           selectionMode="single"  footer={this.displaySelection(this.state.selectedvendor)}
                                           selection={this.state.selectedvendor}
                                           onSelectionChange={(e)=> this.setState({selectedvendor:e.data})} metaKeySelection={false}>
                                    <Column columnKey="vendor_id" field="vendor_id" header="Vendor_ID"
                                            sortable={true}/>
                                    <Column columnKey="name" field="name" header="Name"
                                            sortable={true}/>
                                    <Column columnKey="reg_state" field="reg_state" header="Reg_state"
                                            sortable={true}/>
                                    <Column columnKey="invoice_freq" field="invoice_freq"
                                            header="Invoice_Freq" sortable={true}/>
                                    <Column columnKey="payment_freq" field="payment_freq"
                                            header="Pay_freq" sortable={true}/>
                                    <Column columnKey="address_line_1" field="address_line_1"
                                            header="Address" sortable={true}/>

                                </DataTable>
                            </div>

                    </div>
                </div>



                <div className="modal fade" id="newVendor" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                            <div className="modal-header">
                                <div className="row">
                                    <div className="col-xs-11">
                                        <h4 className="modal-title forms-text">ADD NEW VENDOR</h4>
                                    </div>
                                    <div className="col-xs-1">
                                        <a data-dismiss="modal" style={{cursor: 'pointer'}}><span
                                            className="glyphicon glyphicon-remove"></span></a
                                        ></div>
                                </div>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleCreateVendor.bind(this)}>
                                    <div className="form-group">
                                        <label htmlFor="idclient">Vendor ID</label>
                                        <input type="text" className="form-control" placeholder="Vendor ID"
                                               id="id_number" name="id_number"
                                               onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="clientname">Vendor Name</label>
                                        <input type="text" className="form-control" placeholder="VENDOR NAME" id="name"
                                               name="name"
                                               onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Registration State</label>
                                        <input type="text" placeholder="REGISTRATION STATE" className="form-control"
                                               id="reg_state" name="reg_state" onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Invoice Frequency</label>
                                        <input type="email" placeholder="INVOICE FREQUENCY" className="form-control"
                                               id="invoice_freq" name="invoice_freq" onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="location">Payment Frequency</label>
                                        <input type="text" placeholder="PAYMENT FREQUENCY" className="form-control"
                                               id="payment_freq" name="payment_freq" onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="domain">Address</label>
                                        <input type="text" placeholder="ADDRESS" className="form-control" id="address"
                                               name="address" onChange={this.handleInputChange}/>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-3"></div>
                                        <div className="col-xs-6">
                                            <p style={{
                                                color: 'white',
                                                textAlign: 'center'
                                            }}>{this.state.messageForCreateUser}</p>
                                        </div>
                                        <div className="col-xs-3"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-4"></div>
                                        <div className="col-xs-4">
                                            <button type="submit"
                                                    className="btn btn-primary btn-lg btn-block btn-clr">Create
                                            </button>
                                        </div>
                                        <div className="col-xs-4"></div>
                                    </div>
                                </form>
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
        setTabnerVendors: (vendors) => {
            dispatch(setTabnerVendors(vendors));
        },
        deleteVendor: (index) => {
            dispatch(deleteVendor(index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
