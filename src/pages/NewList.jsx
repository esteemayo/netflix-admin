import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovies } from 'redux/apiCalls/movieApiCalls';
import { createNewList } from 'redux/apiCalls/listApiCalls';

const NewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const { movies } = useSelector((state) => state.movies);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setList({ ...list, [name]: value });
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createNewList(dispatch, { ...list });
    navigate('/lists');
  };

  useEffect(() => {
    fetchMovies(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Title>New List</Title>
      <Form onSubmit={handleSubmit}>
        <Left>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type='text'
              name='title'
              placeholder='Popular Movies'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Genre</Label>
            <Input
              type='text'
              name='genre'
              placeholder='Genre'
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Type</Label>
            <Select name='type' id='type' onChange={handleChange}>
              <Option>Type</Option>
              <Option value='movie'>Movie</Option>
              <Option value='series'>Series</Option>
            </Select>
          </FormGroup>
        </Left>
        <Right>
          <FormGroup>
            <Label>Content</Label>
            <Select
              type='content'
              name='content'
              id='content'
              multiple
              onChange={handleSelect}
            >
              {movies.map((item) => {
                const { _id: id, title } = item;
                return (
                  <Option key={id} value={id}>
                    {title}
                  </Option>
                );
              })}
            </Select>
          </FormGroup>
        </Right>
        <Button>Create</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
  font-size: 1.5rem;
`;

const Title = styled.h1`
  text-transform: capitalize;
`;

const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const Left = styled.div``;

const Right = styled.div``;

const FormGroup = styled.div`
  padding: 2rem;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  text-transform: capitalize;
  font-size: 1.2rem;
  color: gray;
`;

const Input = styled.input`
  display: block;
  width: 40rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: #999;
  caret-color: #00008b;
  border: 1px solid gray;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }
`;

const Select = styled.select`
  display: block;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: #999;
  width: 40rem;
  height: ${(props) => props.type === 'content' && '28.5rem'};
  border: 1px solid gray;
  border-radius: 3px;
  user-select: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }
`;

const Option = styled.option``;

const Button = styled.button`
  border: none;
  display: block;
  height: 3rem;
  padding: 0.7rem 2rem;
  text-transform: capitalize;
  background-color: #00008b;
  color: var(--color-white);
  border-radius: 0.5rem;
  margin-top: 2rem;
  cursor: pointer;
  align-self: center;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(3px);
  }

  &:focus {
    outline: none;
  }
`;

export default NewList;
