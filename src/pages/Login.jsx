import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginUser } from 'redux/apiCalls/userApiCalls';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const usernameRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    loginUser(dispatch, { ...userData });

    const origin = location.state?.from?.pathname || '/';
    navigate(origin);
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormInput
              type='text'
              placeholder='Username'
              required
              ref={usernameRef}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel>Username</FormLabel>
          </FormGroup>
          <FormGroup>
            <FormInput
              type='password'
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel>Password</FormLabel>
          </FormGroup>
          {error && <ErrorMessage>Oops! Something went wrong...</ErrorMessage>}
          <Button>Login</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const FormLabel = styled.label`
  margin-left: 2rem;
  margin-top: 0.7rem;
  font-weight: 600;
  font-size: 1.3rem;
`;

const FormInput = styled.input`
  display: block;
  border: none;
  width: 40rem;
  padding: 1rem 2rem;
  font-family: inherit;
  border-bottom: 3px solid transparent;
  color: #999;
  border-radius: 3px;
  -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  caret-color: #00008b;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 0.5rem 1.5rem rgba(00, 00, 00, 0.075);
    -moz-box-shadow: 0 0.5rem 1.5rem rgba(00, 00, 00, 0.075);
    box-shadow: 0 0.5rem 1.5rem rgba(00, 00, 00, 0.075);
  }

  &:focus:invalid {
    border-bottom: 3px solid #ff7730;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const Button = styled.button`
  border: none;
  display: block;
  padding: 1rem 2rem;
  width: 40rem;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 5px;
  font-size: 1.4rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.7;
    letter-spacing: 3px;
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #ff0000;
  font-weight: 400;
  font-size: 1.4rem;
`;

export default Login;