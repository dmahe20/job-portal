import { createBrowserRouter } from "react-router-dom";
import Main from '../../layouts/Main';
import Home from '../../Components/Commons/Home/Home';
import Login from '../../Components/Login/Login';
import SingUp from '../../Components/SignUp/SignUp';
import Error from '../../Components/Error/Error';
import CreatePost from '../../Components/Recruiter/CreatePost/CreatePost';
import AppliedJobs from '../../Components/Freelancer/AppliedJobs';
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import MyJobs from "../../Components/Commons/JOBS/Jobs";
import Applications from "../../Components/Recruiter/Applications";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <PrivateRoute ><Home /></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SingUp />
            },
            {
                path: "/create-post",
                element: <PrivateRoute><CreatePost /></PrivateRoute>
            },
            {
                path: "/my-jobs",
                element: <PrivateRoute><MyJobs /></PrivateRoute>
            },
            {
                path: "/applied-jobs",
                element: <PrivateRoute><AppliedJobs /></PrivateRoute>
            },
            {
                path: "/job/applications/:job_id",
                element: <PrivateRoute><Applications /></PrivateRoute>
            },
            {
                path: "*",
                element: <Error />
            }
        ]
    }
]);

export default router;