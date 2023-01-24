import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovies, removeMovie } from 'redux/movie/movieSlice';

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  const handleDelete = (id) => {
    dispatch(removeMovie(id));
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'movie',
      headerName: 'Movie',
      width: 200,
      renderCell: (params) => {
        return (
          <MovieListUser>
            <Image src={params.row.img} />
            {params.row.title}
          </MovieListUser>
        );
      },
    },
    {
      field: 'genre',
      headerName: 'Genre',
      width: 120
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 120
    },
    {
      field: 'limit',
      headerName: 'Limit',
      width: 120
    },
    {
      field: 'isSeries',
      headerName: 'isSeries',
      width: 120
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/movies/${params.row._id}`}
              state={params.row}
              className='movie__link'
            >
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteOutline
              onClick={() => handleDelete(params.row._id)}
              style={{
                fontSize: '2rem',
                color: '#ff0000',
                cursor: 'pointer',
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={movies}
        columns={columns}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        style={{ fontSize: '1.5rem' }}
      />
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  padding: 2rem;
`;

const MovieListUser = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
`;

const EditButton = styled.button`
  border: none;
  display: block;
  padding: 0.5rem 1rem;
  text-transform: capitalize;
  background-color: #3bb077;
  color: var(--color-white);
  border-radius: 10rem;
  cursor: pointer;
  margin-right: 1rem;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateX(3px);
  }

  &:focus {
    outline: none;
  }
`;

export default MovieList;
