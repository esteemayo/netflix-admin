import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { phone } from 'responsive';
import app from '../firebase';
import { registerUser, reset } from 'redux/user/userSlice';
import { userInputs } from 'formData';

const NewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.darkMode);
  const { error, isFetching } = useSelector((state) => state.user);

  const [per, setPer] = useState(null);
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFile = (file) => {
    const fileName = `${new Date().getTime()}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `/users/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPer(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...inputs,
    };

    dispatch(registerUser({ credentials: userData, toast }));
    navigate('/users');
  };

  useEffect(() => {
    file && uploadFile(file);
  }, [file]);

  useEffect(() => {
    error && toast.error(error);
    return () => {
      dispatch(reset());
    };
  }, [dispatch, error]);

  return (
    <Container>
      <Title>New user</Title>
      <Form onSubmit={handleSubmit}>
        <FormContainer>
          {userInputs.map((input) => {
            const { id, name, type, label, placeholder } = input;
            return (
              <FormGroup key={id}>
                <FormInput
                  id={id}
                  type={showPassword ? 'text' : type}
                  name={name}
                  placeholder={placeholder}
                  required
                  autoFocus={name === 'username' ? true : false}
                  onChange={handleChange}
                />
                <FormLabel htmlFor={id}>{label}</FormLabel>
                {name === 'username' && (
                  <FaceOutlinedIcon
                    className='user__icon new__user-icon'
                    style={{ color: darkMode ? '#999999' : '#00008b' }} />
                )}
                {name === 'email' && (
                  <EmailOutlinedIcon
                    className='user__icon new__user-icon'
                    style={{ color: darkMode ? '#999999' : '#00008b' }}
                  />
                )}
                {name === 'password' && (
                  showPassword ? (
                    <VisibilityOff
                      onClick={() => setShowPassword(!showPassword)}
                      className='user__icon new__userPassword-icon'
                      style={{ color: darkMode ? '#999999' : '#00008b' }}
                    />
                  ) : (
                    <Visibility
                      onClick={() => setShowPassword(!showPassword)}
                      className='user__icon new__userPassword-icon'
                      style={{ color: darkMode ? '#999999' : '#00008b' }}
                    />
                  )
                )}
                {name === 'confirmPassword' && (
                  showPassword ? (
                    <VisibilityOff
                      onClick={() => setShowPassword(!showPassword)}
                      className='user__icon new__userPassword-icon'
                      style={{ color: darkMode ? '#999999' : '#00008b' }}
                    />
                  ) : (
                    <Visibility
                      onClick={() => setShowPassword(!showPassword)}
                      className='user__icon new__userPassword-icon'
                      style={{ color: darkMode ? '#999999' : '#00008b' }}
                    />
                  )
                )}
              </FormGroup>
            );
          })}
          <FormGroup>
            <FormInput
              id='file'
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <FormLabel htmlFor='file'>Avatar</FormLabel>
            <FileUploadOutlinedIcon
              className='user__icon new__user-icon'
              style={{ color: darkMode ? '#999999' : '#00008b' }}
            />
          </FormGroup>
        </FormContainer>
        <Button
          disabled={isFetching || (per !== null && per < 100)}
        >
          Create
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.bg};
`;

const Title = styled.h1`
  text-transform: capitalize;
`;

const Form = styled.form``;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: 1rem;

    ${phone({ marginBottom: '0.5rem' })}
  }
`;

const FormLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 2rem;
  margin-top: 0.7rem;
  color: rgb(151, 150, 150);
`;

const FormInput = styled.input`
  border: none;
  width: 100%;
  padding: 1.25rem 1.75rem;
  border-top: 3px solid transparent;
  border-bottom: 3px solid ${({ type, theme }) => type === 'file' ? '#bbb' : theme.borderInput};
  font-family: inherit;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  border-radius: 4px;
  caret-color: ${({ theme }) => theme.crInput};
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};
  }

  &:focus:invalid {
    border-bottom: 3px solid #ffb952;
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
  width: 20rem;
  text-transform: capitalize;
  text-align: center;
  padding: 0.7rem 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  background-color: ${({ theme }) => theme.btnNew};
  color: ${({ theme }) => theme.textNew};
  border-radius: 1rem;
  margin-top: 3rem;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.03);

    @media only screen and (max-width: 37.5em), only screen and (hover: none) {
      transform: none;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default NewUser;
