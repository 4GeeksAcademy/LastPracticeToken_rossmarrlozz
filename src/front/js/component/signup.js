import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "../../styles/home.css";

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Error al registrarse"); 
            }
        } catch (error) {
            setError("Error de conexión");
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><strong>Signup</strong></Form.Label> {/* Cambié Login a Email */}
                    <Form.Control 
                        type="email" 
                        value={email} 
                        placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        value={password} 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                        type="checkbox" 
                        label="Recordar mis credenciales" 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)} 
                    />
                </Form.Group>

                {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar el error */}
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
