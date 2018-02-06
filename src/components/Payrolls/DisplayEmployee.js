import React from 'react';
import {Component} from 'react';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Accordion,AccordionTab} from 'primereact/components/accordion/Accordion';
import {MultiSelect} from 'primereact/components/multiselect/MultiSelect';
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");
export default class DisplayEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            cols : [

            ]
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            employees: props.employees
        });
    }

    render() {
        if (this.props.check == 'true') {
            console.log('if loop')

            return (

                 <div className="content-section implementation">
                    <DataTable value={this.state.employees}
                               reorderableColumns={true}
                              paginator={true} rows={10}>
                        <Column field="id" header="EmpID" filter={true} filterMatchMode="contains" />
                        <Column field="lastName" header="LastName" style={{width:'7%'}} filter={true} filterMatchMode="contains"/>
                        <Column field="firstName" header="FirstName" style={{width:'12%'}} filter={true} filterMatchMode="contains"/>
                        <Column field="rate" header="Rate" filter={true} filterMatchMode="contains"/>
                        <Column field="hours" header="Hours" filter={true} filterMatchMode="contains"/>
                        <Column field="earnings" header="Earnings" filter={true} filterMatchMode="contains"/>
                        <Column field="expenses" header="Expenses" filter={true} filterMatchMode="contains"/>
                        <Column field="gross" header="Gross" filter={true} filterMatchMode="contains"/>
                        <Column field="soc" header="Soc" filter={true} filterMatchMode="contains"/>
                        <Column field="med" header="Med" filter={true} filterMatchMode="contains"/>
                        <Column field="fitwh" header="Fitwh" filter={true} filterMatchMode="contains"/>
                        <Column field="state" header="State" filter={true} filterMatchMode="contains"/>
                        <Column field="addState" header="AddState" filter={true} filterMatchMode="contains"/>
                        <Column field="advance" header="Advance" filter={true} filterMatchMode="contains"/>
                        <Column field="med125" header="Med125" filter={true} filterMatchMode="contains"/>
                        <Column field="partial" header="Partial" filter={true} filterMatchMode="contains"/>
                        <Column field="_401k" header="401k" filter={true} filterMatchMode="contains"/>
                        <Column field="net" header="Net" filter={true} filterMatchMode="contains"/>
                        <Column field="netpay" header="Netpay" filter={true} filterMatchMode="contains"/>
                    </DataTable>
                     <br/>
                     <br/>
                     <br/>
                </div>

            );

        } else{
            console.log('else loop');
            return('');
        }
    }
}
