import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 
import { theme } from '../styles/theme'; 
import CPUIcon from '../assets/CPU-icon.png';

// Styled component for the form, arranging inputs and button vertically
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

// Styled component for input fields with consistent styling
const Input = styled.input`
    padding: 8px;
    border: 1px solid ${theme.accent}; // Uses accent color from theme for the border
    border-radius: 4px; // Rounded corners for a modern look
    background-color: ${theme.background}; // Background color from theme
    color: ${theme.textPrimary}; // Text color from theme
`;

// Styled component for the submit button with hover effect
const SubmitButton = styled.button`
    background: ${theme.accent}; // Button background color from theme
    color: ${theme.background}; // Text color from theme
    padding: 10px;
    border: none;
    cursor: pointer; // Changes cursor to pointer on hover over the button

    &:hover {
        opacity: 0.8; // Slightly fades the button on hover for feedback
    }
`;

// Container for the entire LoginForm, with some styling for layout and appearance
const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: row; // Arranges elements side by side
    justify-content: space-between; // Spaces out children elements
    border: 1px solid ${theme.accent}; // Border color from theme
    background: ${theme.backgroundSecondary}; // Background color from theme
    border-radius: 4px; // Rounded corners
    padding: 10px;
    padding-left: 10%; // Padding on the left for inner spacing
    padding-right: 10%; // Padding on the right for inner spacing
`;

// Styled component for the login request message
const LoginRequest = styled.h3`
    color: ${theme.textPrimary}; // Text color from theme
`;

// Styled component for displaying error messages
const ErrorMessage = styled.p`
    color: red; // Color for error messages to stand out
    margin-top: 10px; // Adds some space between the form and the error message
`;

// Type definition for LoginForm component props
type LoginFormProps = {
    handleLoginSuccess: () => void; // Callback for successful login
    handleLoginFailure: () => void; // Callback for failed login
};

// LoginForm functional component definition
const LoginForm: React.FC<LoginFormProps> = ({ handleLoginSuccess, handleLoginFailure }) => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [username, setUsername] = useState(''); // State for storing the username input
    const [password, setPassword] = useState(''); // State for storing the password input
    const [loginFail, setLoginFail] = useState(false); // State to track login failure for error message display

    // Handler for form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submit action
        
        // Dummy authentication check
        if (username === "Daniel" && password === "Zhao") {
            handleLoginSuccess(); // Calls success handler
            localStorage.setItem('username', username); // Stores username in localStorage
            setLoginFail(false); // Resets login failure state
            navigate('/dashboard') // Navigates to dashboard page on success
        }
        else {
            handleLoginFailure(); // Calls failure handler
            setLoginFail(true); // Updates state to reflect login failure
        }
    };

    // Render method for LoginForm component
    return (
        <LoginFormContainer>
            <div>
                <LoginRequest>Please Login to View All Events</LoginRequest> {/* Displays login request message */}
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Username" // Placeholder for username input
                        value={username} // Binds state to input value
                        onChange={(e) => setUsername(e.target.value)} // Updates state on input change
                    />
                    <Input
                        type="password"
                        placeholder="Password" // Placeholder for password input
                        value={password} // Binds state to input value
                        onChange={(e) => setPassword(e.target.value)} // Updates state on input change
                    />
                    <SubmitButton type="submit">Log In</SubmitButton> {/* Submission button */}
                    {loginFail && <ErrorMessage>Password or Username is Wrong.</ErrorMessage> } {/* Conditionally displays error message */}
                </Form>
            </div>
            <img src={CPUIcon} alt='CPU-Icon' width='40%' height='40%' /> {/* Displays an image next to the form */}
        </LoginFormContainer>
    );
};

export default LoginForm;