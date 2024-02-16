import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${theme.accent};
  border-radius: 4px;
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

type LoginFormProps = {
    onLoginSuccess: () => void;
    onLoginFailure: () => void;
};
const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginFailure }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (username === "Daniel" && password === "Zhao") {
        onLoginSuccess();
    }
    else {
        onLoginFailure();
    }
  };

  return (
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
    </Form>
  );
};

export default LoginForm;
