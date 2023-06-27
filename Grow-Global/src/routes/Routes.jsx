import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Login from '../pages/signInSystem/Login';
import Register from '../pages/signInSystem/Register';


const router = createBrowserRouter([

    {
        path: "/",
        element: <Login />,
        // errorElement: <ErrorPage />,
    },
    {
        path: "register",
        element: <Register />,
        // errorElement: <ErrorPage />,
    },
    {
        path: 'home',
        element: <App />,
        // errorElement: <ErrorPage />,
    },
])

export default router