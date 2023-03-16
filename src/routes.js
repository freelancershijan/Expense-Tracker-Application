import { createBrowserRouter } from "react-router-dom";
import DeleteCategory from "./Categories/DeleteCategory";
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
                loader: ({ params }) => fetch(`http://localhost:5000/funds/${params.category}`),
                element: <FundCategory></FundCategory>
            },
            {
                path: '/cost/:category',
                loader: ({ params }) => fetch(`http://localhost:5000/costs/${params.category}`),
                element: <CostCategories></CostCategories>
            }


        ]
    }

])