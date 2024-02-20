import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

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

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Login</Button>;
};

export default LoginButton;
