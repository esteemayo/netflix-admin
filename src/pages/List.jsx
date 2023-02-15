import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { phone } from 'responsive';
import { updateListInputs } from 'formData';
import { reset, updateList } from 'redux/list/listSlice';

const initialState = {
  type: '',
  title: '',
  genre: '',
};

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: list } = useLocation();
  const { error, isSuccess, isFetching } = useSelector((state) => state.lists);

  const [data, setData] = useState(initialState);

  const listId = list?._id;

  const handleChange = ({ target: input }) => {
    const { id, value } = input;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateList(listId, data));
    isSuccess && navigate(-1);
  };

  useEffect(() => {
    setData({
      type: list.type,
      title: list.title,
      genre: list.genre,
    });
  }, [list]);

  useEffect(() => {
    error && toast.error(error);

    return () => {
      dispatch(reset());
    };
  }, [error, dispatch]);

  return (
    <Container>
      <TitleContainer>
        <Title>List</Title>
        <Link to='/lists/new' className='list__link'>
          <AddButton>Create</AddButton>
        </Link>
      </TitleContainer>
      <Top>
        <TopRight>
          <InfoTop>
            <MovieTitle>{list.title}</MovieTitle>
          </InfoTop>
          <InfoBottom>
            <InfoBottonWrapper>
              <InfoItem>
                <InfoKey type='id'>id:</InfoKey>
                <InfoValue type='id'>{listId}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>genre:</InfoKey>
                <InfoValue>{list.genre}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>type:</InfoKey>
                <InfoValue>{list.type}</InfoValue>
              </InfoItem>
            </InfoBottonWrapper>
          </InfoBottom>
        </TopRight>
      </Top>
      <Bottom>
        <Form onSubmit={handleSubmit}>
          <FormLeft>
            {updateListInputs.map((input) => {
              const { id, type, label } = input;
              return (
                <FormGroup key={id}>
                  <Input
                    id={id}
                    type={type}
                    value={data[id] || ''}
                    placeholder={list[id]}
                    onChange={handleChange}
                  />
                  <Label htmlFor='title'>{label}</Label>
                </FormGroup>
              );
            })}
          </FormLeft>
          <FormRight>
            <Button disabled={isFetching}>Update</Button>
          </FormRight>
        </Form>
      </Bottom>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  background-color: ${({ theme }) => theme.bg};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  text-transform: capitalize;
  color: ${({ theme }) => theme.textSoft};
`;

const AddButton = styled.button`
  border: none;
  display: block;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.bgBtnAdd};
  color: ${({ theme }) => theme.textAdd};
  border-radius: 0.5rem;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(3px);
  }

  &:focus {
    outline: none;
  }
`;

const Top = styled.div`
  display: flex;

  ${phone({ flexDirection: 'column' })}
`;

const TopRight = styled.div`
  flex: 1;
  padding: 2rem;
  margin: 2rem;
  font-size: 1.5rem;
 -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const MovieTitle = styled.span`
  text-transform: capitalize;
  font-weight: 600;
`;

const InfoBottom = styled.div`
  margin-top: 1rem;
`;

const InfoBottonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


const InfoItem = styled.div`
  width: 15rem;
  display: flex;
  gap: 1rem;
`;

const InfoKey = styled.span`
  text-transform: ${({ type }) => type === 'id' ? 'uppercase' : 'capitalize'};
`;

const InfoValue = styled.span`
  font-weight: 300;
`;

const Bottom = styled.div`
  padding: 2rem;
  margin: 2rem;
 -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const FormLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  color: gray;
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-left: 2rem;
  margin-top: 0.7rem;
`;

const Input = styled.input`
  border: none;
  display: block;
  width: 50rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgInput};
  color: #999;
  border-bottom: 3px solid ${({ theme }) => theme.borderInput};
  caret-color: ${({ theme }) => theme.crInput};
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    text-transform: capitalize;
    font-size: 1.2rem;
    color: #bbb;
  }

  &:placeholder-shown + ${Label} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(4rem);
  }
`;

const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Button = styled.button`
  border: none;
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.btnUpd};
  color: ${({ theme }) => theme.textUpd};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    opacity: 0.8;
    transform: translateX(3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default List;
