import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            setError("Failed to log in");
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h2 className="text-center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-3" type="submit" disabled={loading}>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-4">
                Don't have any account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
