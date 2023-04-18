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
import Home from "./Home";
import Main from "./Main";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/dashboard',
                element: <Home />
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

        ]
    }

])