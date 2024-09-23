import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { Form, Button, Container } from 'react-bootstrap';

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
        }
    }, [store.token, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email actualizado:", email);
    };

    return (
        <Container>
            <h1>Página Privada</h1>
            
                <Button variant="danger" onClick={() => {
                actions.logout();
                navigate('/login');
                }} className="mt-3">
                Logout
                </Button>
        </Container>
    );
};
