import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/config.store';
import { closeAll } from '../redux/chat.slice';
import { IconButton, Typography } from '@mui/material';
import { Send, PermIdentity, Logout } from '@mui/icons-material';
import styled from 'styled-components';
import { useLogout } from '../auth/useLogout';
import { userLogout } from '../redux/user.slice';
import ProfileCom from './ProfileCom';
import LoaderCom from './LoaderCom'


const AppInfo: FC = () => {
  const [openPro, setOpenPro] = useState(false)
  const [username, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()
  const { mutateAsync: logout, isLoading } = useLogout()

  const handleLogout = () => {
    logout('', {
      onSuccess: () => {
        dispatch(userLogout())
        dispatch(closeAll())
        navigate('/login')
      },
      onError: (err) => {
        console.log(err)
        alert(err)
      }
    })
  }
  const handleProfileOpen = () => {
    setOpenPro(!openPro)
    setUserName('')
    setFirstName('')
    setImageUrl('')
  }
  if (isLoading) {
    return <LoaderCom />
  }
  return (
    <AppInf>
      <Logo>
        <IconButton>
          <span>
            <Send color='primary' style={{ width: 30, height: 30 }} />
          </span>
        </IconButton>
        <Typography ml={{ xs: 0, sm: 2 }} component='h2' variant='h6' color='primary' >
          Messagram
        </Typography>
      </Logo>
      <Personal>
        <IconButton onClick={handleProfileOpen}>
          <PermIdentity />
        </IconButton>
        {user &&
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>}
      </Personal>
      <ProfileCom open={openPro} setOpenPro={setOpenPro}
        setFirstName={setFirstName}
        setImageUrl={setImageUrl}
        setUserName={setUserName}
        username={username}
        firstName={firstName}
        imageUrl={imageUrl}
      />
    </AppInf>
  );
};

export default AppInfo;

const Personal = styled('div')`

`
const AppInf = styled('div')`
  position: relative;
  height: 50px;
  background-color: #f7f6fc;
  /* background-color: #f1eeff; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Logo = styled('div')`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span{
    transform: rotate(-30deg)
  }
`