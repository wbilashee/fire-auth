import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
    const { signup } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value.length < 6) {
            return setError("Password should be at least 6 characters");
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className="w-100 mt-3" type="submit" disabled={loading}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-4">
                Already have an account? Log In
            </div>
        </>
    )
}
