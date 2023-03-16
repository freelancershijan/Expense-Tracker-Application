import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";


function App() {
  return (
    <div>


      <div className="w-3/4 mx-auto my-10">
        <RouterProvider router={routes}></RouterProvider>
        <Toaster></Toaster>
      </div>

    </div>

  );
}

export default App;
