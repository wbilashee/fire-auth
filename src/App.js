import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>,
        },
        {
            path: "/signup",
            element: <Signup />,
        }, {
            path: "/login",
            element: <Login />
        }, {
            path: "/forgot-password",
            element: <ForgotPassword />
        }, {
            path: "/update-profile",
            element: <PrivateRoute>
                <UpdateProfile />
            </PrivateRoute>,
        }
    ]);

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </div>
        </Container>
    )
}
