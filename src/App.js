import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/signup",
            element: <Signup />,
        }, {
            path: "/login",
            element: <Login />
        },
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
