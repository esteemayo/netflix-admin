import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  Error,
  Home,
  List,
  Lists,
  Login,
  Movie,
  MovieList,
  NewList,
  NewMovie,
  NewUser,
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
                  <UserList />
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
                  <MovieList />
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
                  <Lists />
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
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
