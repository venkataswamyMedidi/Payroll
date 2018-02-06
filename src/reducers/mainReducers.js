const mainReducer = (state = {
    isLogged : 'false',
    beforeLogin: 'false',
    userName : '',
    check: '',
    userRole: '',
    defaultEmployee: '',
    tabnerEmployees: [],
    tabnerVendors: [],
    tabnerClients: [],
    employeeRates: [],
    employeeAddress: [],
    vendorEmployees: [],
    vendorInvoices: [],
    vendorAddress:[]
}, action) => {
    switch (action.type) {
        case "LOGIN":
            state = {
                ...state,
                isLogged: action.payload
            };
            break;
        case "LOGOUT":
            state = {
                ...state,
                isLogged: action.payload
            };
            break;
        case "BEFORE_LOGIN":
            state = {
                ...state,
                beforeLogin: action.payload
            };
            break;
        case "USER":
            state = {
                ...state,
                userName: action.payload
            };
            break;
        case "CHECK":
            state = {
                ...state,
                check: action.payload
            };
            break;
        case "USER_ROLE":
            state = {
                ...state,
                userRole: action.payload
            };
            break;
        case "TABNER_EMPLOYEES":
            state = {
                ...state,
                tabnerEmployees: action.payload
            };
            break;
        case "DEFAULT_EMPLOYEE":
            state = {
                ...state,
                defaultEmployee: action.payload
            };
            break;
        case "TABNER_VENDORS":
            state = {
                ...state,
                tabnerVendors: action.payload
            };
            break;
        case "TABNER_CLIENTS":
            state = {
                ...state,
                tabnerClients: action.payload
            };
            break;
        case "DELETE_CLIENT":
            var updatedClients = state.tabnerClients.slice();
            updatedClients.splice(action.payload, 1);
            state = {
                ...state,
                tabnerClients : updatedClients
            };
            break;
        case "DELETE_VENDOR":
            var updatedVendors = state.tabnerVendors.slice();
            updatedVendors.splice(action.payload, 1);
            state = {
                ...state,
                tabnerVendors: updatedVendors
            };
            break;
        case "EMPLOYEE_RATES":
            state = {
                ...state,
                employeeRates: action.payload
            };
            break;
        case "EMPLOYEE_ADDRESS":
            state = {
                ...state,
                employeeAddress: action.payload
            };
            break;
        case "VENDOR_EMPLOYEES":
            state = {
                ...state,
                vendorEmployees: action.payload
            };
            break;
        case "VENDOR_INVOICES":
            state = {
                ...state,
                vendorInvoices: action.payload
            };
            break;
        case "VENDOR_ADDRESS":
            state = {
                ...state,
                vendorAddress: action.payload
            };
            break;
    }
    return state;
};

export default mainReducer;