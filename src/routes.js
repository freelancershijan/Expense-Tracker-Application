import { createBrowserRouter } from "react-router-dom";
import DeleteCategory from "./Categories/DeleteCategory";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Login from "./Components/login/Login/Login";
import Register from "./Components/login/Register/Register";
import ResetPass from "./Components/login/ResetPass/ResetPass";
import AllCost from "./Details/AllCost";
import AllFund from "./Details/AllFund";
import CostCategories from "./Details/CostCategories";
import FundCategory from "./Details/FundCategory";
import DashboardLayout from "./Dashboard/DashboardLayout";
import Dashboard from "./Dashboard/Dashboard";
import AddFund from "./Categories/AddFund";
import AddCost from "./Categories/AddCost";
import FundsCategory from "./Dashboard/FundsCategory";
import CostsCategory from "./Dashboard/CostsCategory";
import PrivateRoute from "./PrivetRoute/PrivateRoute";
import ProtectedRoute from "./ProtectectRoute/ProtectedRoute";

export const routes = createBrowserRouter([


    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Dashboard /></PrivateRoute>
            },
            {
                path: '/delete-category',
                element: <DeleteCategory />
            },
            {
                path: '/total-earning',
                element: <AllFund></AllFund>

            },
            {
                path: '/total-cost',
                element: <AllCost></AllCost>

            },
            {
                path: '/fund/:category',
                loader: ({ params }) => fetch(`https://expense-tracker-application-server.vercel.app/funds/${params.category}`),
                element: <FundCategory></FundCategory>
            },
            {
                path: '/cost/:category',
                loader: ({ params }) => fetch(`https://expense-tracker-application-server.vercel.app/costs/${params.category}`),
                element: <CostCategories></CostCategories>
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
        element: <ProtectedRoute><Login /></ProtectedRoute>
    },

    {
        path: '/register',
        element: <ProtectedRoute><Register></Register></ProtectedRoute>
    },
    {
        path: '/reset-password',
        element: <ProtectedRoute><ResetPass></ResetPass></ProtectedRoute>
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    },

]) 