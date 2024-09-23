import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Form, Button, Container } from 'react-bootstrap';
import "../../styles/home.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); 
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (store.token) {
            navigate('/private');
        }
    }, [store.token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await actions.login(email, password);
            if (success) {
                navigate('/private');
            } else {
                alert("Login fallido. Por favor, verifica tus credenciales.");
            }
        } catch (error) {
            alert("Ocurrió un error en el proceso de inicio de sesión. Intenta de nuevo más tarde.");
            console.error("Error en el inicio de sesión:", error);
        }
    };

    return (
      <Container>
                <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><strong>Login</strong></Form.Label>
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

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>


      </Container>
    );
}
