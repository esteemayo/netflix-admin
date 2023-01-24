import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  Publish,
} from '@material-ui/icons';

import { phone } from 'responsive';
import { fetchUser, updateUser } from 'redux/user/userSlice';

const initialState = {
  role: '',
  email: '',
  username: '',
};

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isFetching } = useSelector((state) => state.user);

  const [inputs, setInputs] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      ...inputs,
    };

    dispatch(updateUser({ userId: id, credentials, toast }));
  };

  useEffect(() => {
    isSuccess && navigate('/users');
  }, [isSuccess, navigate]);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    setInputs({
      name: user?.name,
      role: user?.role,
      email: user?.email,
      username: user?.username,
    });
  }, [user]);

  return (
    <Container>
      <TitleContainer>
        <Title>Edit user</Title>
        <Link to='/users/new' className='user__link'>
          <Button>Create</Button>
        </Link>
      </TitleContainer>
      <UserContainer>
        <ShowUser>
          <Top>
            <Image
              src={user.avatar || '/assets/img/netflix-default-avatar.jpg'}
              alt={user.username}
            />
            <TopTitle>
              <ShowUserUsername>{user.username}</ShowUserUsername>
            </TopTitle>
          </Top>
          <Bottom>
            <UserTitle>Account details</UserTitle>
            <UserInfo>
              <PermIdentity style={{ fontSize: '1.6rem' }} />
              <UserInfoTitle>{user.username}</UserInfoTitle>
            </UserInfo>
            <UserInfo>
              <CalendarToday style={{ fontSize: '1.6rem' }} />
              <UserInfoTitle>
                {new Date(user.createdAt).toLocaleString('en-us', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </UserInfoTitle>
            </UserInfo>
            <UserTitle>Contact details</UserTitle>
            <UserInfo>
              <MailOutline style={{ fontSize: '1.6rem' }} />
              <UserInfoTitle>{user.email}</UserInfoTitle>
            </UserInfo>
          </Bottom>
        </ShowUser>
        <UpdateUser>
          <UpdateUserTitle>Edit</UpdateUserTitle>
          <Form onSubmit={handleSubmit}>
            <Left>
              <FormGroup>
                <FormInput
                  type='text'
                  value={inputs.username}
                  placeholder={user.username}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Username</FormLabel>
              </FormGroup>
              <FormGroup>
                <FormInput
                  type='email'
                  value={inputs.email}
                  placeholder={user.email}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Email</FormLabel>
              </FormGroup>
              <FormGroup>
                <FormInput
                  type='text'
                  name='role'
                  value={inputs.role}
                  placeholder={user.role}
                  onChange={handleChange}
                  required
                />
                <FormLabel>Role</FormLabel>
              </FormGroup>
            </Left>
            <Right>
              <Upload>
                <UpdateUserImage
                  src={'/assets/img/netflix-default-avatar.jpg'}
                  alt=''
                />
                <FormLabel htmlFor='file'>
                  <Publish style={{ fontSize: '2rem', cursor: 'pointer' }} />
                </FormLabel>
                <FormInput
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                />
              </Upload>
              <FormButton disabled={isFetching}>Update</FormButton>
            </Right>
          </Form>
        </UpdateUser>
      </UserContainer>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
  font-size: 1.5rem;
`;

const Title = styled.h1``;

const Button = styled.button`
  border: none;
  display: block;
  text-transform: capitalize;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  background-color: #008080;
  color: var(--color-white);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  font-size: 1.5rem;

  ${phone({ flexDirection: 'column' })}
`;

const ShowUser = styled.div`
  flex: 1;
  padding: 2rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);

  ${phone({ marginBottom: '3rem' })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

const TopTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
  margin-left: 2rem;
`;

const ShowUserUsername = styled.span`
  font-weight: 600;
`;

const Bottom = styled.div`
  margin-top: 2rem;
`;

const UserTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
  color: rgb(175, 170, 170);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  color: #444;
  font-weight: 500;

  ${phone({ padding: '0.8rem 0' })}
`;

const UserInfoTitle = styled.span`
  margin-left: 1rem;
`;

const UpdateUser = styled.div`
  flex: 2;
  margin-left: 2rem;
  padding: 2rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);

  ${phone({ marginLeft: 0 })}
`;

const UpdateUserTitle = styled.span`
  font-size: 2.4rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  ${phone({ flexDirection: 'column' })}
`;

const Left = styled.div``;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const FormLabel = styled.label`
  color: #999;
  font-size: 1.4rem;
  margin-left: 2rem;
  margin-top: 0.7rem;
`;

const FormInput = styled.input`
  border: none;
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  background-color: var(--color-white);
  color: #999;
  padding: 1.5rem 2rem;
  width: 40rem;
  border-radius: 4px;
  border-bottom: 3px solid #bbb;
  caret-color: #00008b;
  transition: all 0.5s ease;

  ${phone({
  width: '100%',
  padding: '1rem 2rem',
  borderBottom: '2px solid #bbb',
})}

  @media only screen and (max-width: 23.44em) {
    width: 27rem;
  }

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
    box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);

    ${phone({ borderBottom: '2px solod #008080' })}
  }

  &:focus:invalid {
    border-bottom: 3px solid #ffb952;

    ${phone({ borderBottom: '2px solid #ffb952' })}
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;

  ${phone({ justifyContent: 'space-between' })}
`;

const UpdateUserImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  display: inline-block;
  object-fit: cover;
  margin-right: 2rem;

  ${phone({
  width: '8rem',
  height: '8rem',
  marginRight: '1rem',
})}
`;

const FormButton = styled.button`
  border: none;
  display: block;
  padding: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s ease;

  ${phone({ marginTop: '3rem' })}

  &:hover {
    letter-spacing: 2px;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

export default User;
