import { Line } from 'rc-progress';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Publish } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { phone } from 'responsive';
import { updateMovie } from 'redux/movie/movieSlice';

const initialState = {
  title: '',
  year: '',
  genre: '',
  limit: '',
};

const Movie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: movie } = useLocation();
  const { error, isFetching } = useSelector((state) => state.movies);

  const [img, setImg] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [imgSm, setImgSm] = useState(null);
  const [imgSmPerc, setImgSmPerc] = useState(0);
  const [video, setVideo] = useState(null);
  const [videoPerc, setVideoPerc] = useState(0);
  const [trailer, setTrailer] = useState(null);
  const [trailerPerc, setTrailerPerc] = useState(0);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgTitlePerc, setImgTitlePerc] = useState(0);
  const [inputs, setInputs] = useState(initialState);

  const movieId = movie?._id;

  const handleChange = ({ target: input }) => {
    const { id, type, value } = input;
    if (type === 'number') Number(input);
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const uploadFile = (file, label) => {
    const fileName = `${new Date().getTime()}-${label}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `movies/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (label) {
          case 'img':
            setImgPerc(Math.round(progress));
            break;
          case 'imgSm':
            setImgSmPerc(Math.round(progress));
            break;
          case 'imgTitle':
            setImgTitlePerc(Math.round(progress));
            break;
          case 'video':
            setVideoPerc(Math.round(progress));
            break;
          case 'trailer':
            setTrailerPerc(Math.round(progress));
            break;

          default:
            break;
        }

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
          setInputs((prev) => ({ ...prev, [label]: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const movie = {
      ...inputs,
    };

    dispatch(updateMovie({ movieId, movie }));
    navigate('/movies');
  };

  const disableBtn = isFetching ||
    (imgPerc > 0 && imgPerc < 100) ||
    (imgSmPerc > 0 && imgSmPerc < 100) ||
    (imgTitlePerc > 0 && imgTitlePerc < 100) ||
    (videoPerc > 0 && videoPerc < 100) ||
    (trailerPerc > 0 && trailerPerc < 100)

  useEffect(() => {
    img && uploadFile(img, 'img');
    imgSm && uploadFile(imgSm, 'imgSm');
    imgTitle && uploadFile(imgTitle, 'imgTitle');
    video && uploadFile(video, 'video');
    trailer && uploadFile(trailer, 'trailer');
  }, [img, imgSm, imgTitle, video, trailer]);

  useEffect(() => {
    setInputs({
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      limit: movie.limit,
    });
  }, [movie]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Container>
      <TitleContainer>
        <Title>Movie</Title>
        <Link to='/movies/new' className='movie__link'>
          <AddButton>Create</AddButton>
        </Link>
      </TitleContainer>
      <Top>
        <TopRight>
          <InfoTop>
            <Image src={movie.img} alt='' />
            <MovieTitle>{movie.title}</MovieTitle>
          </InfoTop>
          <InfoBottom>
            <InfoBottonWrapper>
              <InfoItem>
                <InfoKey>id:</InfoKey>
                <InfoValue>{movieId}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>genre:</InfoKey>
                <InfoValue>{movie.genre}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>year:</InfoKey>
                <InfoValue>{movie.year}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>limit:</InfoKey>
                <InfoValue>{movie.limit}</InfoValue>
              </InfoItem>
            </InfoBottonWrapper>
          </InfoBottom>
        </TopRight>
      </Top>
      <Bottom>
        <Form onSubmit={handleSubmit}>
          <FormLeft>
            <FormGroup>
              <Input
                id='title'
                type='text'
                value={inputs.title || ''}
                placeholder={movie.title}
                onChange={handleChange}
              />
              <Label>Movie title</Label>
            </FormGroup>
            <FormGroup>
              <Input
                id='year'
                type='text'
                value={inputs.year || ''}
                placeholder={movie.year}
                onChange={handleChange}
              />
              <Label>Year</Label>
            </FormGroup>
            <FormGroup>
              <Input
                id='genre'
                type='text'
                value={inputs.genre || ''}
                placeholder={movie.genre}
                onChange={handleChange}
              />
              <Label>Genre</Label>
            </FormGroup>
            <FormGroup>
              <Input
                id='limit'
                type='text'
                value={inputs.limit || ''}
                placeholder={movie.limit}
                onChange={handleChange}
              />
              <Label>Limit</Label>
            </FormGroup>
            <FormGroup>
              {imgPerc > 0 ? (
                <Line
                  percent={imgPerc}
                  strokeWidth={1}
                  strokeColor='#8884d8'
                />
              ) : (
                <Input
                  id='img'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImg(e.target.files[0])}
                />
              )}
              <Label htmlFor='img'>Image</Label>
            </FormGroup>
            <FormGroup>
              {imgTitlePerc > 0 ? (
                <Line
                  percent={imgTitlePerc}
                  strokeWidth={1}
                  strokeColor='#8884d8'
                />
              ) : (
                <Input
                  type='file'
                  id='imgTitle'
                  accept='image/*'
                  onChange={(e) => setImgTitle(e.target.files[0])}
                />
              )}
              <Label htmlFor='imgTitle'>Title image</Label>
            </FormGroup>
            <FormGroup>
              {imgSmPerc > 0 ? (
                <Line
                  percent={imgSmPerc}
                  strokeWidth={1}
                  strokeColor='#8884d8'
                />
              ) : (
                <Input
                  id='imgSm'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImgSm(e.target.files[0])}
                />
              )}
              <Label htmlFor='imgSm'>Thumbnail image</Label>
            </FormGroup>
            <FormGroup>
              {trailerPerc > 0 ? (
                <Line
                  percent={trailerPerc}
                  strokeWidth={1}
                  strokeColor='#8884d8'
                />
              ) : (
                <Input
                  type='file'
                  id='trailer'
                  accept='video/*'
                  onChange={(e) => setTrailer(e.target.files[0])}
                />
              )}
              <Label htmlFor='trailer'>Trailer</Label>
            </FormGroup>
            <FormGroup>
              {videoPerc > 0 ? (
                <Line
                  percent={videoPerc}
                  strokeWidth={1}
                  strokeColor='#8884d8'
                />
              ) : (
                <Input
                  id='video'
                  type='file'
                  accept='video/*'
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              )}
              <Label htmlFor='video'>Video</Label>
            </FormGroup>
          </FormLeft>
          <FormRight>
            <FileUpload>
              <Img src={img ? URL.createObjectURL(img) : movie.img} alt='' />
              <Label htmlFor='file'>
                <Publish style={{ fontSize: '2rem', cursor: 'pointer', display: 'none' }} />
              </Label>
              <Input
                id='file'
                type='file'
                style={{ display: 'none' }}
              />
            </FileUpload>
            <Button disabled={disableBtn}>Update</Button>
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

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
`;

const MovieTitle = styled.span`
  text-transform: capitalize;
  font-weight: 600;
  margin-left: 2rem;
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
  justify-content: space-between;
`;

const InfoKey = styled.span`
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

const FileUpload = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 30rem;
  height: 30rem;
  border-radius: 1rem;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
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

export default Movie;
