export function login() {
    return {
        type: "LOGIN",
        payload: 'true'
    };
}

export function logout() {
    return {
        type: "LOGOUT",
        payload: 'false'
    };
}

export function beforeLogin() {
    return {
        type: "BEFORE_LOGIN",
        payload: true
    };

}

export function setUser(name) {
    return {
        type: "USER",
        payload: name
    };

}

export function setCheck(name) {
    return {
        type: "CHECK",
        payload: name
    };

}

export function  setUserRole(role) {
    return {
        type: "USER_ROLE",
        payload: role
    };

}

export function setTabnerEmployees(employees) {
    return {
        type: "TABNER_EMPLOYEES",
        payload: employees
    };

}

export function setDefaultEmployee(employee) {
    return {
        type: "DEFAULT_EMPLOYEE",
        payload: employee
    };

}

export function setTabnerVendors(vendors) {
    return {
        type: "TABNER_VENDORS",
        payload: vendors
    };

}

export function setTabnerClients(clients) {
    return {
        type: "TABNER_CLIENTS",
        payload: clients
    };

}
export function deleteClient(index) {
    return {
        type: "DELETE_CLIENT",
        payload: index
    };

}

export function deleteVendor(index) {
    return {
        type: "DELETE_VENDOR",
        payload: index
    };
}

export function setEmployeeRates(employee_rates) {
    return {
        type: "EMPLOYEE_RATES",
        payload: employee_rates
    };

}

export function setEmployeeAddress(employee_address) {
    return {
        type: "EMPLOYEE_ADDRESS",
        payload: employee_address
    };

}

export function setVendorEmployees(venEmployees) {
    return {
        type: "VENDOR_EMPLOYEES",
        payload: venEmployees
    };

}

export function setVendorInvoices(venInvoices) {
    return {
        type: "VENDOR_INVOICES",
        payload: venInvoices
    };

}

export function setVendorAddress(vendor_Address) {
    return {
        type: "VENDOR_ADDRESS",
        payload: vendor_Address
    };

}

export function setTabnerInvoices(invoices) {
    return {
        type: "TABNER_INVOICES",

        payload: invoices
    };
}