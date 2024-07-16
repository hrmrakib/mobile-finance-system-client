import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PendingUser from "../pages/PendingUser";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <h2>404 - Not Found!</h2>,
    children: [{ path: "/dashboard/pendingUser", element: <PendingUser /> }],
  },
]);
export default router;
