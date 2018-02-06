import React from 'react';
import {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';
import {
    login, logout,  deleteClient,  setTabnerClients,

} from '../../actions/mainActions';
import {connect} from "react-redux";
require("primereact/resources/themes/omega/theme.css");
require("primereact/resources/primereact.min.css");


class Clients extends Component {

    constructor(){
        super();
        this.state = {
            cli: '',
            idclient: '',
            clientname: '',
            phone: '',
            email: '',
            location: '',
            domain: '',
            messageForCreateUser: '',
            message: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClientSelect = this.onClientSelect.bind(this);
        this.handleCreateClient = this.handleCreateClient.bind(this);
        this.ifGotResponseFromCreateClient = this.ifGotResponseFromCreateClient.bind(this);
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

            axios.get('http://'+localStorage.getItem('your_ip')+':8090/tabnerclients', config)
                .then((response) => {
                    this.props.setTabnerClients(response.data.response);
                    console.log(response);
                    console.log('dataaaa fromm redux');
                    console.log(this.props.main.tabnerClients);
                    console.log(this.props.main.tabnerClients[0]);

                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }



    handleCreateClient(event){
        event.preventDefault();
        console.log(this.state.idclient + this.state.clientname + this.state.phone + this.state.email + this.state.location + this.state.domain);

        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/newclient', {
            idclient: this.state.idclient,
            clientname : this.state.clientname,
            phone : this.state.phone,
            email: this.state.email,
            location: this.state.location,
            domain: this.state.domain
        }, config)
            .then((response) => this.ifGotResponseFromCreateClient(response))
            .catch(function (error) {
                console.log(error);
            });
    }

    ifGotResponseFromCreateClient(response) {
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);

            browserHistory.push("/home");
            browserHistory.push("/loggedIn");

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* The given Client Id id already exists'
            });
        }

    }

    onClientSelect(index){

        //this.props.setDefaultClient(this.props.main.tabnerClients[index]);

        var alert_msg = window.confirm("Are you sure you want to delete?");
        if(alert_msg) {
            var config = {
                headers: {'Authorization': localStorage.getItem('tabner_token')}
            };
            axios.post('http://'+localStorage.getItem('your_ip')+':8090/deleteclient', {
                idclient: this.props.main.tabnerClients[index].idclient
            }, config)
                .then((response) => this.ifGotResponseFromDeleteClient(response, index))
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    ifGotResponseFromDeleteClient(response, index){
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);
            this.props.deleteClient(index);

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* Cannot delete the client'
            });
        }
    }


    render() {

        const clients = this.props.main.tabnerClients.map((client, index) => {
            if(this.state.cli === ''){
                return   <tr className="employee_hover" key={index}>
                    <td>{client.idclient}</td>
                    <td>{client.clientname}</td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                    <td>{client.location}</td>
                    <td>{client.domain}</td>
                    <td> <span className="glyphicon glyphicon-trash" onClick = { () => this.onClientSelect(index)}></span></td>
                </tr>
            } else {
                if((client.clientname.toUpperCase().indexOf(this.state.cli) > -1) || (client.phone.indexOf(this.state.cli) > -1) || (client.email.toUpperCase().indexOf(this.state.cli) > -1) || (client.location.toUpperCase().indexOf(this.state.cli) > -1) || (client.domain.toUpperCase().indexOf(this.state.cli) > -1)){
                    return   <tr className="employee_hover" key={index}>
                        <td>{client.idclient}</td>
                        <td>{client.clientname}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>{client.location}</td>
                        <td>{client.domain}</td>
                        <td><span className="glyphicon glyphicon-trash" onClick = { () => this.onClientSelect(index)}></span> </td>

                    </tr>
                } else {
                    return   <tr className="employee_hover" key={index} style={{display: 'none'}}>
                        <td>{client.idclient}</td>
                        <td>{client.clientname}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>{client.location}</td>
                        <td>{client.domain}</td>
                        <td> <span className="glyphicon glyphicon-trash" onClick = { () => this.onClientSelect(index)}></span></td>

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
                                    <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#newClient" data-backdrop="true">Add Client</button>
                                </div>
                                <div className="col-xs-3" style={{float:'right', paddingRight: '0px'}}>
                                    <input type="text" className="form-control" placeholder="Search for..." id="cli" name="cli"
                                           onChange={this.handleInputChange}/>
                                </div>
                                <table class="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Client ID</th>
                                        <th>Client Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Location</th>
                                        <th>Domain</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {clients}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>




                    <div>
                    </div>

                    <div className="modal fade" id="newClient" tabindex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content"  style={{backgroundColor: '#2d60a3'}}>
                                <div className="modal-header">
                                    <div className="row">
                                        <div className="col-xs-11">
                                            <h4 className="modal-title forms-text">ADD NEW CLIENT</h4>
                                        </div>
                                        <div className="col-xs-1">
                                            <a data-dismiss="modal" style={{cursor : 'pointer'}}><span className="glyphicon glyphicon-remove"></span></a
                                            ></div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleCreateClient.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="idclient">Client ID</label>
                                            <input type="text" className="form-control" placeholder="CLIENT ID" id= "idclient" name="idclient"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="clientname">Client Name</label>
                                            <input type="text" className="form-control" placeholder="CLIENT NAME" id= "clientname" name="clientname"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" placeholder="PHONE" className="form-control" id="phone" name="phone"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" placeholder="EMAIL" className="form-control" id="email" name="email"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="location">Location</label>
                                            <input type="text" placeholder="LOCATION" className="form-control" id="location" name="location"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="domain">Domain</label>
                                            <input type="text" placeholder="DOMAIN" className="form-control" id="domain" name="domain"
                                                   onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className = "row">
                                            <div className="col-xs-3"></div>
                                            <div className="col-xs-6">
                                                <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForCreateUser}</p>
                                            </div>
                                            <div className="col-xs-3"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4"></div>
                                            <div className="col-xs-4">
                                                <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Create</button>
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
        setTabnerClients: (clients) => {
            dispatch(setTabnerClients(clients));
        },
        deleteClient: (index) => {
            dispatch(deleteClient(index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);