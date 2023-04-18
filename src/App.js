import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { Helmet } from 'react-helmet';

function App() {
  return (
    <div>

      <Helmet>
        <title>My Awesome React Website</title>
        <meta name="description" content="This is an Expense Tracking Software whih Created by Md Shijan Ali using MERN Stack" />
        <meta property="og:title" content="Expense Tracking Software" />
        <meta property="og:description" content="This is an Expense Tracking Software whih Created by Md Shijan Ali using MERN Stack" />
        <meta property="og:image" content="./images/shijan.jpg" />
      </Helmet>


      <div className="lg:w-3/4 md:mx-10 mx-5 lg:mx-auto my-10">
        <RouterProvider router={routes}></RouterProvider>
        <Toaster></Toaster>
      </div>

    </div>

  );
}

export default App;
