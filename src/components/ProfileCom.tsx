import { FC, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/config.store';
import styled from 'styled-components';
import { userEdit } from '../redux/user.slice';
import { useUpdateUser } from '../auth/auth.db';
import { Save, AccountCircle } from '@mui/icons-material';
import { TextField, IconButton } from '@mui/material';
import LoaderCom from './LoaderCom';

interface ProfileProps {
  open: boolean;
  setOpenPro: React.Dispatch<SetStateAction<boolean>>;
  setUserName: React.Dispatch<SetStateAction<string>>;
  setFirstName: React.Dispatch<SetStateAction<string>>;
  setImageUrl: React.Dispatch<SetStateAction<string>>;
  username: string;
  firstName: string;
  imageUrl: string;
}

const ProfileCom: FC<ProfileProps> = (props) => {
  const { open, setOpenPro, setFirstName, setImageUrl, setUserName } = props
  const { username, firstName, imageUrl } = props;
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const { mutateAsync: updateUser, isLoading } = useUpdateUser()

  const handleChangeUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (user && username.length > 0 && firstName.length > 0) {
      let changedUser = {} as typeof user
      if (username.length > 0 && firstName.length > 0 && imageUrl.length === 0){
        changedUser = {
          ...user,
          username: username ,
          first_name: firstName,
        }
      } else {
        changedUser = {
          ...user,
          username: username ,
          first_name: firstName,
          img_url: imageUrl
        }
      }
      updateUser(changedUser, {
        onSuccess: (info) => {
          dispatch(userEdit(changedUser))
          setUserName('')
          setFirstName('')
          setImageUrl('')
          setOpenPro(false)
        },
        onError: (err) => {
          alert(err)
          console.log(err)
        }
      })
    }
  }
  if (isLoading) {
    return <LoaderCom />
  }
  return (
    <Profile open={open}>
      <div>
        {user && <>
          <Account>   
            {user.img_url ?
              <AccountImage>
                <img src={user.img_url} alt="User Image" />
              </AccountImage> :
              <AccountImage>
                <AccountCircle color='primary' style={{ width: 100, height: 100 }} />
              </AccountImage>
            }
          </Account>
          <ProfileForm onSubmit={handleChangeUser}>
            <FormItem>
              <TextField
                error={username !== undefined && username.length < 5 && username.length > 0}
                id="username"
                label="Username"
                type="text"
                variant="filled"
                fullWidth
                size='small'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormItem>
            <FormItem>
              <TextField
                id="firstname"
                label="Firstname"
                type="text"
                variant="filled"
                fullWidth
                size='small'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormItem>
            <FormItem>
              <TextField
                id="lastname"
                label="Image url adress"
                type="text"
                variant="filled"
                fullWidth
                size='small'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </FormItem>
            <FormSave>
              <Submit>
                <span>
                  Save
                </span>
                <IconButton>
                  <Save />
                </IconButton>
              </Submit>
            </FormSave>
            <ShowUploadImage>
              {imageUrl && imageUrl.length > 0 &&
                <img src={imageUrl} alt='image' />}
            </ShowUploadImage>
          </ProfileForm>
        </>}
      </div>
    </Profile>
  );
};

export default ProfileCom;

const ShowUploadImage = styled('div')`
  width: 100%;
  min-height: 100px;
  img{
    width: 100%;
    height: 100%;
  }
`

const UploadImage = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Submit = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const FormSave = styled('div')`
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const AccountImage = styled('div')`
  width:100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width:100px;
    height: 100px;
    border-radius: 50%;
  }
`
const Account = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  padding-top: 20px;
`
const FormItem = styled('div')`
  padding: 10px 0;
  /* margin: 20px; */
`

const ProfileForm = styled('form')`
  padding: 10px;
  margin-bottom: 60px;
`

const Profile = styled('div') <{ open?: boolean }>`
  display: flex;
  flex-direction:column;
  position: absolute;
  top: 50px;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
  transition: all 0.3s ease;
  transform: translateX(${p => p.open ? 0 : -130}%);
  overflow-y: hidden ;
  background-color: #ffffff;
  & > div {
    overflow-y:auto;
    &::-webkit-scrollbar {
    width: 5px;
    background-color: #e2e4e9;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 50px;
  }
  }
`