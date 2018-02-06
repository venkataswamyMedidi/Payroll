import React from 'react';
import {Component} from 'react';
import {browserHistory} from 'react-router';
import axios from 'axios';
import DisplayEmployee from "./DisplayEmployee";
import {login, logout} from '../../actions/mainActions';
import {connect} from "react-redux";

class Employee extends Component {

    constructor(){
        super();
        this.state = {
            paydates : [],
            currentPaydate : [],
            check : 'false',
            paycorid: '',
            firstname: '',
            lastname: '',
            email: '',
            messageForCreateUser: '',
            message: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.ifGotResponseFromCreateUser = this.ifGotResponseFromCreateUser.bind(this);

    }

    componentWillMount(){
        if(this.props.main.isLogged == 'false'){
            browserHistory.push("/home");
        }
    }

    componentDidMount(){
        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };

        axios.get('http://'+localStorage.getItem('your_ip')+':8090/paydates', config)
            .then((response) => {
            console.log(response)
            this.setState({
                paydates: response.data.response
            });
            console.log('printing paydates' + this.state.paydates);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleCreateUser(event){
        event.preventDefault();

        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/newuser', {
            paycorId : this.state.paycorid,
            firstName : this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email
        }, config)
            .then((response) => this.ifGotResponseFromCreateUser(response))
            .catch(function (error) {
                console.log(error);
            });
    }

    ifGotResponseFromCreateUser(response) {
        console.log(response);
        if (response.data.response === true) {

            console.log(response.data.response);

            browserHistory.push("/home");
            browserHistory.push("/loggedIn");

        }
        if (response.data.response === false){
            console.log('message is setting');
            this.setState({

                messageForCreateUser: '* The given paycor id already exists'
            });
        }



    }

    onPayDateSelect(index) {
        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/employees', {
            date : this.state.paydates[index]
        }, config)
            .then((response) => {

            this.setState({
                currentPaydate: response.data.response,
                check: 'true'
            });
                console.log("checking the response");
                console.log(response.data.response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        const dates = this.state.paydates.map((date, index) => {
            return <li key={index} onClick={() => this.onPayDateSelect(index)}><a href="#" >{date}</a></li>
        });

        return(
           <div style={{display: 'none'}}>
               <div className="dropdown">
                    <hr/>
                   <button className="btn btn-danger dropdown-toggle btn-align" type="button" data-toggle="dropdown" style={{backgroundColor : 'red'}} >Get Details
                       <span className="caret"></span></button>
                   <button className="btn btn-primary btn-align" type="button" data-toggle="modal" data-target="#newUser" data-backdrop="false">Got a New Employee ?</button>
                   <div>
                       <h3>{this.state.message}</h3>
                   </div>
                   <ul className="dropdown-menu">
                       {dates}
                   </ul>
               </div>
               <hr/>

               <DisplayEmployee employees={this.state.currentPaydate} check={this.state.check}/>

               <div className="modal fade" id="newUser" role="dialog">
                   <div className="modal-dialog">
                       <div className="modal-content"  style={{backgroundColor: '#2d60a3'}}>
                           <div className="modal-header">
                               <div className="row">
                                   <div className="col-xs-11">
                                       <h4 className="modal-title forms-text">CREATE NEW EMPLOYEE</h4>
                                   </div>
                                   <div className="col-xs-1">
                                       <a data-dismiss="modal" style={{cursor : 'pointer'}}><span className="glyphicon glyphicon-remove"></span></a
                                       ></div>
                               </div>
                           </div>
                           <div className="modal-body">
                               <form onSubmit={this.handleCreateUser.bind(this)}>
                                   <div className="form-group">
                                       <label htmlFor="email">Paycor id:</label>
                                       <input type="text" className="form-control" placeholder="PAYCOR ID" id= "paycorid" name="paycorid"
                                               onChange={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="pwd">FirstName:</label>
                                       <input type="text" placeholder="FIRST NAME" className="form-control" id="firstname" name="firstname" onChange={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="pwd">LastName:</label>
                                       <input type="text" placeholder="LAST NAME" className="form-control" id="lastname" name="lastname" onChange={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <label htmlFor="pwd">Email:</label>
                                       <input type="email" placeholder="EMAIL" className="form-control" id="email" name="email" onChange={this.handleInputChange}/>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);