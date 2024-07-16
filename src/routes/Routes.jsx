import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/dashboard",
  },
]);
export default router;
