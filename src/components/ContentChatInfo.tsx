import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/config.store';
import { closeAll } from '../redux/chat.slice';
import styled from 'styled-components'
import { ArrowBack, PersonRemove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { dialogDBRef } from '../chats/chats';
import { remove, child } from 'firebase/database';
import { IDialog } from '../chats/chat';

const ContentChatInfo: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const chatState = useSelector((state: RootState) => state.chat)
  const { self, dialog, group, channel } = chatState

  const handleRemoveDialog = (dlg: IDialog) => {
    remove(child(dialogDBRef, dlg.dialog_id))
      .then(res => {
        dispatch(closeAll())
        console.log("ishladimi")
      })
      .catch(err => {
        alert(err)
        console.log(err)
      })
  }

  return (
    <>
      {self &&
        <UserInfo>
          <div>
            {self.img_url ?
              <img src={self.img_url} /> :
              `${self.first_name ? self.first_name[0] : self.username[0]}`}
          </div>
          <span>
            {self.first_name ?
              `${self.first_name}` :
              `${self.username}`}
          </span>
        </UserInfo>}
      {dialog &&
        <UserInfo>
          {user && dialog.users.user1.userID === user.userID ? <>
            <div>
              {dialog.users.user2.img_url ?
                <img src={dialog.users.user2.img_url} /> :
                `${dialog.users.user2.username[0]}`}
            </div>
            <span>
              {dialog.users.user2.first_name ?
                `${dialog.users.user2.first_name}` :
                `${dialog.users.user2.username}`}
            </span>
          </> :
            <>
              <div>
                {dialog.users.user1.img_url ?
                  <img src={dialog.users.user1.img_url} /> :
                  `${dialog.users.user1.username[0]}`}
              </div>
              <span>
                {dialog.users.user1.first_name ?
                  `${dialog.users.user1.first_name}` :
                  `${dialog.users.user1.username}`}
              </span>
            </>}
        </UserInfo>}
      <InfoButton>
        {dialog &&
          <IconButton onClick={() => handleRemoveDialog(dialog)}>
            <PersonRemove />
          </IconButton>}
        <IconButton onClick={() => dispatch(closeAll())}>
          <ArrowBack />
        </IconButton>
      </InfoButton>
    </>
  );
};

export default ContentChatInfo;

export const UserInfo = styled('div')`
  display: flex;
  align-items: center;
  div {
    margin-right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: #ddd;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  span {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }
`
export const InfoButton = styled('div')`
  /* @media (min-width: 567px){
    display: none;
  } */
`