import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';

import { loginInputs } from 'formData';
import { loginUser, reset } from 'redux/user/userSlice';

const initialState = {
  username: '',
  password: '',
  showPassword: false,
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(initialState);
  const { darkMode } = useSelector((state) => state.darkMode);
  const { currentUser, error, isSuccess, isFetching } = useSelector((state) => state.user);

  const { showPassword } = data;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ credentials: data, toast }));

    const origin = location.state?.from?.pathname || '/';
    currentUser && isSuccess && navigate(origin);
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          {loginInputs.map((input) => {
            const { id, name, type, label, placeholder } = input;
            return (
              <FormGroup key={id}>
                <FormInput
                  type={showPassword ? 'text' : type}
                  name={name}
                  placeholder={placeholder}
                  required
                  autoFocus={name === 'username' ? true : false}
                  onChange={handleChange}
                />
                <FormLabel>{label}</FormLabel>
                {name === 'username' ? (
                  <FaceOutlinedIcon
                    className='username__icon'
                    style={{ color: darkMode ? '#8884d8' : '#008080' }}
                  />
                ) : (
                  showPassword ? (
                    <VisibilityOff
                      onClick={handleToggle}
                      className='password__icon'
                      style={{ color: darkMode ? '#8884d8' : '#008080' }}
                    />
                  ) : (
                    <Visibility
                      onClick={handleToggle}
                      className='password__icon'
                      style={{ color: darkMode ? '#8884d8' : '#008080' }}
                    />
                  )
                )}
              </FormGroup>
            );
          })}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button disabled={isFetching}>
            {isFetching ? 'Processing...' : 'Login'}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  position: relative;

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
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  border-radius: 3px;
  -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  caret-color: ${({ theme }) => theme.crInput};
  transition: all 0.5s ease;
  z-index: 20;

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
  background-color: ${({ theme }) => theme.bgBtnAdd};
  color: ${({ theme }) => theme.textAdd};
  border-radius: 5px;
  font-size: 1.4rem;
  margin-top: 2rem;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.7;
    letter-spacing: 3px;
    transform: translateY(-3px);
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
