import React, {Component} from 'react';
import {Link, browserHistory} from "react-router";
import  axios  from 'axios';
import {login, logout,beforeLogin, setUser,setCheck} from '../../actions/mainActions';
import {connect} from "react-redux";
import {ActiveEmployees} from '../Employees/ActiveEmployees';


let styles = {
    /*backgroundColor : 'black'*/
    margin : '0px',
    /* backgroundColor : '',*/
    backgroundColor :  'red',
    border : '0px',

};


let text = {
    color : 'white',
    cursor : 'pointer',

}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empl:[],
            terminated_date:'',
            index:'',
            emp_id: '',
            email: '',
            password: '',
            messageForSignIn: '',
            messageForSignUp: ''

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.ifGotResponseFromSignUp = this.ifGotResponseFromSignUp.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.ifGotResponseFromLogout = this.ifGotResponseFromLogout.bind(this);
        this.getemployeenames= this.getemployeenames.bind(this);
        this.onEmployeeSelect = this.onEmployeeSelect.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'email' ? target.value : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/login', {
            username: this.state.email,
            password: this.state.password
        })
            .then((response) => this.ifGotResponseFromSubmit(response))
            .catch(function (error) {
                console.log(error);
            });
    }

    ifGotResponseFromSubmit(response) {

        if (response.data.response === true) {
            localStorage.setItem('tabner_token' ,response.data.token )
            console.log("token check");
            console.log(response);
            this.props.beforeLogin();
            this.props.setUser(this.state.email);
            this.props.setCheck('login');
            browserHistory.push('/home-single');
            browserHistory.push('/totp') ;


        } else {
            this.setState({
                password: '',
                messageForSignIn: '* please login using valid credentials'
            });
            this.props.logout();
        }
    }

    onSignOut(){
        var config = {
            headers: {'Authorization': localStorage.getItem('tabner_token')}
        };
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/logout',{},config)
            .then((response) => this.ifGotResponseFromLogout(response))
            .catch(function (error) {
                console.log(error);
            });

    }

    ifGotResponseFromLogout(response) {

        this.setState( {
            email: '',
            password: '',
            message: ''
        });
        this.props.logout();

        localStorage.removeItem('tabner_token');
        browserHistory.push("/home");
    }

    handleSignUp(event){
        event.preventDefault();
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/signup', {
            emp_id: this.state.emp_id,
            username: this.state.email,
            password: this.state.password
        })
            .then((response) => this.ifGotResponseFromSignUp(response))
            .catch(function (error) {
                console.log(error);
            });
    }
    ifGotResponseFromSignUp(response) {

        if (response.data.response === true) {
            console.log('pushing to barcode');
            localStorage.setItem('tabner_secret', response.data.secret);
            localStorage.setItem('tabner_token' ,response.data.token );
            console.log('reaching here barcode')
            this.props.setCheck('logging out');
            this.props.beforeLogin();
            this.props.setUser(this.state.email);
            browserHistory.push('/home-single');
            browserHistory.push('/barcode');
        } else {
            this.setState({
                password: '',
                messageForSignUp: '* Email Already Exists'
            });
            this.props.logout();
        }
    }

    getemployeenames(){
        console.log('........employeee.....');
        var config = {
            headers: {'tabner_token': localStorage.getItem('tabner_token')}
        };
        axios.get('http://'+localStorage.getItem('your_ip')+':8090/employeelist', config)
            .then((response) => {
                console.log(response)
                this.setState({
                    empl: response.data.response
                });
                console.log('printing employees' + this.state.empl);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onEmployeeSelect(e){
        console.log(e.target.value);
        this.setState({
            emp_id:e.target.value
        });
    }

    handleTerminateEmployee(event){
        event.preventDefault();
        console.log(this.state.first_name + this.state.terminated_date);

        var config = {
            headers: {'tabner_token': localStorage.getItem('tabner_token')}
        };
        console.log('emp id...'+this.state.emp_id);
        axios.post('http://'+localStorage.getItem('your_ip')+':8090/terminateemployee', {
            emp_id: this.state.emp_id,
            terminated_date: this.state.terminated_date

        }, config)
            .catch(function (error) {
                console.log(error);
            });
    }




    render() {

        var emps='';
        if(this.state.empl.length > 0){
            emps = this.state.empl.map((emp, index) => {
                console.log('employee first name' +emp.first_name);
                return <option value={emp.emp_id}> {emp.first_name}, {emp.last_name} ({emp.emp_id})</option>
            });
        }

        if(this.props.main.isLogged === 'true'){

            return(

                <div className="navbar-div">
                    <div>
                        <nav className="navbar-xs" style={styles}>
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand" href="#" style={text} activeStyle={{backgroundColor: '#595851'}}>e-Portal</a>
                                </div>
                                <ul className="nav navbar-nav">
                                    <li className="test" ><Link to={"/employees/active"} style={text} activeStyle={{backgroundColor: '#2d60a3'}}>Employees</Link></li>
                                    <li className="test" ><Link to={"/vendors"} style={text} activeStyle={{backgroundColor: '#2d60a3'}}>Vendors</Link></li>
                                    {/*<li className="test" ><Link to={"/clients"} style={text} activeStyle={{backgroundColor: '#2d60a3'}}>Clients</Link></li>*/}
                                    {/*
                <div className="test-nav">
                    <a ><Link to={"/home"} activeStyle={{color: 'red'}}>Home</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/employees"} activeStyle={{color: 'red'}}>Employees</Link></a><span className="pipe-class">|</span>
                    <a style={{display: 'none'}}><Link to={"/loggedIn"} activeStyle={{color: 'red'}}>Payrolls</Link></a><span style={{display: 'none'}} className="pipe-class">|</span>
                    <a style={{display: 'none'}}><Link to={"/rates"} activeStyle={{color: 'red'}}>Rates</Link></a><span style={{display: 'none'}} className="pipe-class">|</span>
                    <a><Link to={"/employees"} activeStyle={{color: 'red'}}>Employees</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/vendors"} activeStyle={{color: 'red'}}>Vendors</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/clients"} activeStyle={{color: 'red'}}>Clients</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/invoices"} activeStyle={{color: 'red'}}>Invoices</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/newfile"} activeStyle={{color: 'red'}}>File Upload</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/rates"} activeStyle={{color: 'red'}}>Rates</Link></a><span className="pipe-class">|</span>
                    <a><Link to={"/address"} activeStyle={{color: 'red'}}>Address</Link></a><span className="pipe-class">|</span>

                    <hr/>
                </div>
*/}
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li className="test"><a onClick={this.onSignOut.bind(this)} style={text}><span className="glyphicon glyphicon-log-in"></span> Sign Out</a></li>
                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                    <li className="dropdown"><a1 href="#" class="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-th" style={{marginTop:'5px',right:'0px'}}></span></a1>

                                        <ul className="dropdown-menu">
                                            <div className="row">
                                                <div class="col-sm-6">
                                                    <li ><a1 href="#listemp"  data-toggle="modal" onClick={ this.getemployeenames.bind(this)}>
                                                        <img src="https://cdn1.iconfinder.com/data/icons/education-set-6/512/delete-user-512.png" style={{height:'37px',width:'35px',marginTop:'5px',marginLeft:'5px'}}/>
                                                    </a1></li>
                                                </div>
                                                <div class="col-sm-6">
                                                    <li ><a1 data-target="#personalDetails" data-toggle="modal">
                                                        <img src="http://www.icone-png.com/png/20/20399.png" style={{height:'44px',width:'44px'}}/>
                                                    </a1></li>
                                                </div>
                                            </div>
                                        </ul>

                                    </li>
                                </ul>


                                <div className="modal fade" id="listemp" role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content" style={{backgroundColor: '#2d60a3'}} >
                                            <div className="modal-body">
                                                <form onSubmit={this.handleTerminateEmployee.bind(this)}>
                                                    <div className="form-group">
                                                        <label htmlFor="emp_name">Employee Name</label>
                                                        <select class="form-control" id="emp_name" onChange={this.onEmployeeSelect}>
                                                            <option disabled selected value> -- select an employee -- </option>
                                                            {emps}
                                                        </select>

                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="terminated_date">DateOfTermination:</label>
                                                        <input type="date" name="terminated_date" onChange={this.handleInputChange}></input>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-4"></div>
                                                        <div className="col-xs-4">
                                                            <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Submit</button>
                                                        </div>
                                                        <div className="col-xs-4"></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>

                        </nav>
                    </div>


                </div>
            );
        }
        else  if(this.props.main.isLogged === 'false'){

            return (
                <nav className="navbar-xs" style={styles}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#" style={text}> e-Portal</a>
                        </div>

                        <ul className="nav navbar-nav navbar-right">
                            {/*<li><Link to={"/join"} activeClassName={"active"} activeStyle={{backgroundColor: "#F5F5F5"}} style={text}><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                             <li><Link to={"/login"} activeClassName={"active"} activeStyle={{backgroundColor: "#F5F5F5"}} style={text}><span className="glyphicon glyphicon-log-in"></span> Sign In</Link></li>
                             */}
                            {/*<li className="test"><a style={text} data-toggle="modal" data-target="#signUp" data-backdrop="false"><span
                             className="glyphicon glyphicon-user"> </span> Sign Up</a></li>*/}
                            {/*SIGN UP MODAL*/}
                            <li className="dropdown test ">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" style={text}><span
                                    className="glyphicon glyphicon-user"> </span> Sign Up</a>
                                <ul id="signup-dp" className="dropdown-menu">
                                    <li className="signup-modal" id = "signup">
                                        <div className="row">
                                            <div className="col-md-12 form-form">
                                                <div className="form-title">
                                                    <h4 className="modal-title forms-text">CREATE ACCOUNT</h4>
                                                    <hr/>
                                                </div>
                                                <form onSubmit={this.handleSignUp.bind(this)}>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Employee ID</label>
                                                        <input type="text" className="form-control" placeholder="EMPLOYEE ID" id="emp_id" name="emp_id"
                                                               onChange={this.handleInputChange}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email Address:</label>
                                                        <input type="email" className="form-control" id="email" name="email"
                                                               pattern="[a-z.]*[@]\btabnergc.com" placeholder="EMAIL ADDRESS"
                                                               oninvalid="setCustomValidity('please enter your tabnergc id')"
                                                               onChange={this.handleInputChange} required/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="pwd">Password:</label>
                                                        <input type="password" className="form-control" id="password" name="password"
                                                               placeholder="PASSWORD" onChange={this.handleInputChange} required/>
                                                    </div>
                                                    <div className = "row">
                                                        <div className="col-xs-12">
                                                            <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForSignUp}</p>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Sign Up</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>

                            {/*SIGN IN MODAL*/}

                            <li className="dropdown test">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" style={text}><span
                                    className="glyphicon glyphicon-log-in"> </span> Sign In</a>
                                <ul id="login-dp" className="dropdown-menu">
                                    <li>
                                        <div className="row">
                                            <div className="col-md-12 form-form">
                                                <div className="form-title">
                                                    <h4 className="modal-title forms-text">WELCOME BACK</h4>
                                                    <hr/>
                                                </div>
                                                <form onSubmit={this.handleSubmit.bind(this)}>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email Address:</label>
                                                        <input type="email" className="form-control" id="email" name="email"
                                                               pattern="[a-z.]*[@]\btabnergc.com" placeholder="EMAIL ADDRESS"
                                                               oninvalid="setCustomValidity('please enter your tabnergc id')"
                                                               onChange={this.handleInputChange} required/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="pwd">Password:</label>
                                                        <input type="password" className="form-control" id="password" name="password"
                                                               placeholder="PASSWORD" onChange={this.handleInputChange} required/>
                                                    </div>
                                                    <div className = "row">
                                                        <div className="col-xs-12">
                                                            <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForSignIn}</p>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Sign In</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            {/*<li className="test"><a style={text}  data-toggle="modal" data-target="#signIn" data-backdrop="false"><span
                             className="glyphicon glyphicon-log-in"> </span>  Sign In</a></li>*/}

                        </ul>
                    </div>


                    {/* model box for sign in*/}

                    {/*
                    <div className="modal fade" id="signIn" role="dialog">
                        <div className="modal-dialog">


                            <div className="modal-content" style={{backgroundColor: '#2d60a3'}}>
                                <div className="modal-header">
                                    <div className="row">
                                        <div className="col-xs-11">
                                            <h4 className="modal-title forms-text">WELCOME BACK</h4>
                                        </div>
                                        <div className="col-xs-1">
                                            <a data-dismiss="modal" style={{cursor : 'pointer'}}><span className="glyphicon glyphicon-remove"></span></a
                                            ></div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address:</label>
                                            <input type="email" className="form-control" name="email" id="email"
                                                   pattern="[a-z.]*[@]\btabnergc.com" placeholder="EMAIL ADDRESS"
                                                   oninvalid="setCustomValidity('please enter your tabnergc id')"
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">Password:</label>
                                            <input type="password" className="form-control" id="password"
                                                   name="password" placeholder="PASSWORD" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className = "row">
                                            <div className="col-xs-3"></div>
                                            <div className="col-xs-6">
                                                <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForSignIn}</p>
                                            </div>
                                            <div className="col-xs-3"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4"></div>
                                            <div className="col-xs-4">
                                                <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Sign In</button>
                                            </div>
                                            <div className="col-xs-4"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
*/}

                    {/* model box for sign up*/}
                    {/*
                    <div className="modal fade" id="signUp" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content"  style={{backgroundColor: '#2d60a3'}}>
                                <div className="modal-header">
                                    <div className="row">
                                        <div className="col-xs-11">
                                            <h4 className="modal-title forms-text">CREATE ACCOUNT</h4>
                                        </div>
                                        <div className="col-xs-1">
                                            <a data-dismiss="modal" style={{cursor : 'pointer'}}><span className="glyphicon glyphicon-remove"></span></a>
                                            </div>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSignUp.bind(this)}>
                                        <div className="form-group">
                                            <label htmlFor="email">Employee ID</label>
                                            <input type="emp_id" className="form-control" placeholder="EMPLOYEE ID" id="emp_id" name="emp_id"
                                                    onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address:</label>
                                            <input type="email" className="form-control" placeholder="EMAIL ADDRESS" id="email" name="email"
                                                   oninvalid="setCustomValidity('please enter your tabnergc id')"
                                                   pattern="[a-z.]*[@]\btabnergc.com" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">Password:</label>
                                            <input type="password" placeholder="PASSWORD" className="form-control" id="pwd" name="password" onChange={this.handleInputChange}/>
                                        </div>
                                        <div className = "row">
                                            <div className="col-xs-3"></div>
                                            <div className="col-xs-6">
                                                <p style={{color : 'white', textAlign : 'center'}}>{this.state.messageForSignUp}</p>
                                            </div>
                                            <div className="col-xs-3"></div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4"></div>
                                            <div className="col-xs-4">
                                                <button type="submit" className="btn btn-primary btn-lg btn-block btn-clr">Sign Up</button>
                                            </div>
                                            <div className="col-xs-4"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
*/}

                </nav>
            );
        }
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
        beforeLogin: () => {
            dispatch(beforeLogin());
        },
        setUser: (name) => {
            dispatch(setUser(name));
        },
        setCheck: (name) => {
            dispatch(setCheck(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
