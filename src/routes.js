import { createBrowserRouter } from "react-router-dom";
import AddCost from "./Categories/AddCost";
import AddFund from "./Categories/AddFund";
import DeleteCategory from "./Categories/DeleteCategory";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Login from "./Components/login/Login/Login";
import Register from "./Components/login/Register/Register";
import ResetPass from "./Components/login/ResetPass/ResetPass";
import CostsCategory from "./Dashboard/CostsCategory";
import Dashboard from "./Dashboard/Dashboard";
import DashboardLayout from "./Dashboard/DashboardLayout";
import FundsCategory from "./Dashboard/FundsCategory";
import CostCategoryLists from "./Details/CostCategoryLists";
import FundCategoryLists from "./Details/FundCategoryLists";
// import PrivateRoute from "./PrivetRoute/PrivateRoute";
// import ProtectedRoute from "./ProtectectRoute/ProtectedRoute";

export const routes = createBrowserRouter([


    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/delete-category',
                element: <DeleteCategory />
            },
            {
                path: '/fund-category/:category',
                element: <FundCategoryLists />
            },
            {
                path: '/cost-category/:category',
                element: <CostCategoryLists />
            },
            {
                path: '/add-fund',
                element: <AddFund />
            },
            {
                path: '/add-cost',
                element: <AddCost />
            },
            {
                path: '/fund-category',
                element: <FundsCategory />
            }
            ,
            {
                path: '/cost-category',
                element: <CostsCategory />
            },
           

        ]
    },
    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/reset-password',
        element: <ResetPass></ResetPass>
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    },

]) 