import React from 'react';
import ReactDOM from 'react-dom';
/*import './index.css';*/
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import App from './components/App';
import Home from './components/Home';
import Employee from "./components/Payrolls/Employee";
import Rates from "./components/Rates/Rates";
import PayRates from "./components/Rates/PayRates";
import BillRates from "./components/Rates/BillRates";
import store from "./store";
import {Provider} from "react-redux";
import Barcode from "./components/Otp/Barcode";
import Totp from "./components/Otp/Totp";
import Employees from "./components/Employees/Employees";
import ActiveEmployees from "./components/Employees/ActiveEmployees";
import InactiveEmployees from "./components/Employees/InactiveEmployees";
import Vendors from "./components/Vendors/Vendors";
import Clients from "./components/Clients/Clients";
import EmployeeAddress from "./components/Address/EmployeeAddress";
import SimpleReactFileUpload from "./components/FileUpload/SimpleReactFileUpload";
import Invoices from "./components/Invoices/Invoices";
import DefaultEmployee from "./components/Employees/DefaultEmployee";
require("./stylesheets/css/main.css");


class Main extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={App} >
                    <IndexRoute component={Home} />
                    <Route path={"loggedIn"} component={Employee}  />
                    <Route path={"home"} component={Home} />
                    <Route path={"barcode"} component={Barcode} />
                    <Route path={"totp"} component={Totp} />
                    <Route path={"rates"} component={Rates} >
                       {/* <Route path={"payrates"} component={PayRates}  />
                        <Route path={"billrates"} component={BillRates} />*/}
                    </Route>
                    <Route path={"employees"} component={Employees}>
                        <Route path={"active"} component={ActiveEmployees}>
                            <IndexRoute component={DefaultEmployee}/>
                        </Route>
                        <Route path={"inactive"} component={InactiveEmployees} />
                    </Route>
                    <Route path={"vendors"} component={Vendors} />
                    <Route path={"clients"} component={Clients} />
                    <Route path={"rates"} component={Rates}/>
                    <Route path={"address"} component={EmployeeAddress}/>
                    <Route path={"newfile"} component={SimpleReactFileUpload}/>
                    <Route path={"invoices"} component={Invoices}/>

                </Route>
                <Route path={"home-single"} component={Home}/>
            </Router>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    window.document.getElementById('root'));

