import { FC, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import 'rsuite/dist/rsuite.min.css';
import './main.css';
import { useDispatch } from 'react-redux';
import { IUser } from './auth/auth'; 
import { userLogin } from './redux/user.slice';
import { AppDispath } from './redux/config.store';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispath>()
  const user = localStorage.getItem('user')
  // localStorage.removeItem('user')
  // console.log(user);
  useEffect(() => {
    if (user) {
      const u = JSON.parse(user) as IUser
      dispatch(userLogin(u))
      navigate('/')
    } else {
      navigate('/register')
    }
  }, [])

  return (
    <Routes>{
      user
        ?
        <Fragment >
          <Route path='/' element={<MainPage />} />
        </Fragment>
        :
        <Fragment>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Fragment>
      }
      <Route path='*' element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
