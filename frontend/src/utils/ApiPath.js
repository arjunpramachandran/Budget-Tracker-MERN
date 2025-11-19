// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://budget-tracker-mern-backend.onrender.com";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        SIGNUP: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getUser",
    },
    DASHBOARD:{
        GET_DASHBOARD_DATA: "/api/dashboard/data",
        LAST_TRANSACTIONS: "/api/dashboard/lastTransactions"
    },
    INCOME: {
        ADD_INCOME: "/api/income/add",
        GET_INCOMES: "/api/income/get",
        DELETE_INCOME: "/api/income/delete"
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/expense/add",
        GET_EXPENSES: "/api/expense/get",
        DELETE_EXPENSE: "/api/expense/delete"
    },
    
}