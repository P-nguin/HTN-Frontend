import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import CPUIcon from '../assets/CPU-icon.png'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid ${theme.accent};
    border-radius: 4px;
    background-color: ${theme.background};
    color: ${theme.textPrimary};
`;

const SubmitButton = styled.button`
    background: ${theme.accent};
    color: ${theme.background};
    padding: 10px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.8; 
    }
`;

const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid ${theme.accent};
    background: ${theme.backgroundSecondary};
    border-radius: 4px;
    padding: 10px;
    padding-left: 10%;
    padding-right: 10%;
`;

const LoginRequest = styled.h3`
    color: ${theme.textPrimary};
`;

const ErrorMessage = styled.p`
    color: red; // Or any color that suits your design for errors
    margin-top: 10px; // Adds some space between the form and the error message
`;

type LoginFormProps = {
    handleLoginSuccess: () => void;
    handleLoginFailure: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ handleLoginSuccess, handleLoginFailure }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFail, setLoginFail] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (username === "Daniel" && password === "Zhao") {
            handleLoginSuccess();
            localStorage.setItem('username', username);
            setLoginFail(false);
            navigate('/dashboard')
        }
        else {
            handleLoginFailure();
            setLoginFail(true);
        }
    };

    return (
        <LoginFormContainer>
            <div>
                <LoginRequest>Please Login to View All Events</LoginRequest>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton type="submit">Log In</SubmitButton>
                    {loginFail && <ErrorMessage>Password or Username is Wrong.</ErrorMessage> }
                </Form>
            </div>
            <img src={CPUIcon} alt='CPU-Icon' width='40%' height='40%' />
        </LoginFormContainer>
    );
};

export default LoginForm;
