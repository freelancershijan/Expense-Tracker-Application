import { createBrowserRouter } from "react-router-dom";
import DeleteCategory from "./Categories/DeleteCategory";
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
            }


        ]
    }

])