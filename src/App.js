import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import { listColumns, movieColumns, userColumns } from 'data';
import {
  Home,
  List,
  Lists,
  Login,
  Movie,
  MovieList,
  NewList,
  NewMovie,
  NewUser,
  NotFound,
  SharedLayout,
  SharedLayoutPage,
  User,
  UserList,
} from 'pages/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<SharedLayout />}>
          <Route
            index
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route path='users' element={<SharedLayoutPage />}>
            <Route
              index
              element={
                <AuthRoute>
                  <UserList columns={userColumns} />
                </AuthRoute>
              }
            />
            <Route
              path=':id'
              element={
                <AuthRoute>
                  <User />
                </AuthRoute>
              }
            />
            <Route
              path='new'
              element={
                <AuthRoute>
                  <NewUser />
                </AuthRoute>
              }
            />
          </Route>
          <Route path='movies' element={<SharedLayoutPage />}>
            <Route
              index
              element={
                <AuthRoute>
                  <MovieList columns={movieColumns} />
                </AuthRoute>
              }
            />
            <Route
              path=':id'
              element={
                <AuthRoute>
                  <Movie />
                </AuthRoute>
              }
            />
            <Route
              path='new'
              element={
                <AuthRoute>
                  <NewMovie />
                </AuthRoute>
              }
            />
          </Route>
          <Route path='lists' element={<SharedLayoutPage />}>
            <Route
              index
              element={
                <AuthRoute>
                  <Lists columns={listColumns} />
                </AuthRoute>
              }
            />
            <Route
              path=':id'
              element={
                <AuthRoute>
                  <List />
                </AuthRoute>
              }
            />
            <Route
              path='new'
              element={
                <AuthRoute>
                  <NewList />
                </AuthRoute>
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
