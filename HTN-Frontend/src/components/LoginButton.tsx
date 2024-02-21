import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// Creating a styled button component with custom styles
const Button = styled.button`
  background: transparent;
  border: 2px solid ${theme.accent};
  color: ${theme.primary};
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 20px;
  
  &:hover {
    background: ${theme.accent};
    color: ${theme.background};
  }
`;

// Interface to define props for the LoginButton component
interface LoginButtonProps {
  onClick: () => void;
}

// Functional component definition for LoginButton
const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Login</Button>;
};

export default LoginButton;
