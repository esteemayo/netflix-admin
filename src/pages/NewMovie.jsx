import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { createMovie } from 'redux/movie/movieSlice';
import { movieInputs } from 'formData';

const NewMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isFetching } = useSelector((state) => state.movies);

  const [img, setImg] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [video, setVideo] = useState(null);
  const [movie, setMovie] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [trailer, setTrailer] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = `${new Date().getTime()}-${item.label}-${item.file.name
        }`;

      const storage = getStorage(app);
      const storageRef = ref(storage, `movies/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, item.file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
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
            setMovie((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });

            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    upload([
      { file: img, label: 'img' },
      { file: imgTitle, label: 'imgTitle' },
      { file: imgSm, label: 'imgSm' },
      { file: trailer, label: 'trailer' },
      { file: video, label: 'video' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createMovie({ ...movie }))
    isSuccess && navigate('/movies');
  };

  return (
    <Container>
      <Title>New movie</Title>
      <Form>
        {movieInputs.map((input) => {
          const { id, name, type, label, placeholder } = input;
          return (
            <FormGroup key={id}>
              <Label>{label}</Label>
              <Input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
              />
            </FormGroup>
          );
        })}
        <FormGroup>
          <Label>Is Series?</Label>
          <Select name='isSeries' id='isSeries' onChange={handleChange}>
            <Option value='false'>No</Option>
            <Option value='true'>Yes</Option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Image</Label>
          <Input
            type='file'
            id='img'
            name='img'
            onChange={(e) => setImg(e.target.files[0])}
          />
        </FormGroup>
        <FormGroup>
          <Label>Title image</Label>
          <Input
            type='file'
            id='imgTitle'
            name='imgTitle'
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </FormGroup>
        <FormGroup>
          <Label>Thumbnail image</Label>
          <Input
            type='file'
            id='imgSm'
            name='imgSm'
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </FormGroup>
        <FormGroup>
          <Label>Trailer</Label>
          <Input
            type='file'
            id='trailer'
            name='trailer'
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </FormGroup>
        <FormGroup>
          <Label>Video</Label>
          <Input
            id='video'
            type='file'
            name='video'
            accept='video/*'
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </FormGroup>
        {uploaded === 5 ? (
          <Button
            disabled={isFetching}
            onClick={handleSubmit}
          >
            Create
          </Button>
        ) : (
          <Button onClick={handleUpload}>Upload</Button>
        )}
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

const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

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
  width: 30rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: #999;
  background-color: transparent;
  caret-color: ${({ theme }) => theme.crInput};
  border: 1px solid gray;
  border-radius: 3px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};
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
  background-color: transparent;
  color: #999;
  width: 30rem;
  border: 1px solid gray;
  border-radius: 3px;
  user-select: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:focus {
    outline: none;
    -webkit-box-shadow: ${({ theme }) => theme.box};
    -moz-box-shadow: ${({ theme }) => theme.box};
    box-shadow: ${({ theme }) => theme.box};
  }
`;

const Option = styled.option``;

const Button = styled.button`
  border: none;
  display: block;
  height: 3rem;
  padding: 0.7rem 2rem;
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.btnNew};
  color: ${({ theme }) => theme.textNew};
  border-radius: 0.5rem;
  margin-top: 2rem;
  outline-color: ${({ theme }) => theme.text};
  cursor: pointer;
  align-self: center;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translate(3px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default NewMovie;
