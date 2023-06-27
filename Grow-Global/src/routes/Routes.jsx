import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from '../pages/signInSystem/Login';
import Register from '../pages/signInSystem/Register';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';


const router = createBrowserRouter([

    {
        path: "/",
        element: <Login />,
       
    },
    {
        path: "register",
        element: <Register />,
       
    },
    {
        path: 'home',
        element: <ProtectedRoute> <App /></ProtectedRoute>
       
    },
])

export default router