import { FC, useState, useEffect } from 'react';
import { onValue, set, child } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/config.store';
import { setDialog, setSelf, setGroup, setChannel } from '../redux/chat.slice';
import { ListChat, ListChatHeader, ListChatIcons } from '../styledComponents/ListChatComDetails';
import { ListChatBody, ListCHatItem, Users, UsersButton, UsersItem } from '../styledComponents/ListChatComDetails';
import { Person, PeopleAlt, Contactless, PersonAdd } from '@mui/icons-material';
import { Tabs, Tab, IconButton } from '@mui/material';
import AppInfo from './AppInfo';
import { IDialog, IChannel, IGroup, ISelf } from '../chats/chat';
import { useGetUsers } from '../auth/auth.db';
import { chatsDBRef, dialogDBRef } from '../chats/chats';
import { v4 } from 'uuid';
import LoaderCom from './LoaderCom';

const ListChatCom: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const chats = useSelector((state: RootState) => state.chat)
  const { data: users, isLoading: usersLoading } = useGetUsers()

  const [showUsers, setShowUsers] = useState(false)

  const [dlgs, setDlgs] = useState([] as IDialog[])
  const [groups, setGroups] = useState([] as IGroup[])
  const [channels, setChannels] = useState([] as IChannel[])

  const [tab, setTab] = useState(0)
  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  useEffect(() => {
    onValue(chatsDBRef(chats, tab), (snapshot) => {
      if (!snapshot.val()) {
        setDlgs([])
        setGroups([])
        setChannels([])
      }
      if (tab === 0 && snapshot.val()) {
        const dialogsObj = snapshot.val()
        const dialogs = Object.values(dialogsObj) as IDialog[]
        if (user) {
          const filterD = dialogs.filter(dialog =>
            (dialog.users.user1.userID === user.userID || dialog.users.user2.userID === user.userID))
          setDlgs(filterD)
        }
      }
      if (tab === 1 && snapshot.val()) {
        const groupsObj = snapshot.val()
        const groups = Object.values(groupsObj) as IGroup[]
        setGroups(groups)
      }
      if (tab === 2 && snapshot.val()) {
        const channelsObj = snapshot.val()
        const channels = Object.values(channelsObj) as IChannel[]
        setChannels(channels)
      }
    })
  }, [showUsers, users, user, chats.dialog])

  const handleGetUsers = () => {
    setShowUsers(!showUsers)
  }

  const handleMakeDialog = (userr: ISelf) => {
    if (user && user.userID !== userr.userID && !dlgs.some(d => (d.users.user2.userID === userr.userID) || (d.users.user1.userID === userr.userID))) {
      const dialog: IDialog = {
        dialog_id: v4(),
        users: {
          user1: user,
          user2: userr
        },
        createDate: Date.now()
      }
      set(child(dialogDBRef, `/${dialog.dialog_id}`), dialog).then(res => {
        setShowUsers(false)
        dispatch(setDialog(dialog))
      })
    }
  }

  if (usersLoading) {
    return <LoaderCom />
  }
  return (
    <ListChat>
      <AppInfo />
      <ListChatHeader>
        <ListChatIcons>
          <Tabs value={tab} onChange={handleTab} aria-label="icon tabs example">
            <Tab icon={<Person style={{ width: 30 }} />} aria-label="favorite" />
            <Tab icon={<PeopleAlt />} aria-label="person" />
            <Tab icon={<Contactless />} aria-label="person" />
          </Tabs>
        </ListChatIcons>
      </ListChatHeader>
      <ListChatBody >
        <div>
          {tab === 0 && user &&
            <ListCHatItem onClick={() => dispatch(setSelf(user))}>
              <div>
                {user.img_url ? <img src={user.img_url} /> : `${user.first_name ? user.first_name[0] : user.username[0]}`}
              </div>
              <span>
                Personal
              </span>
            </ListCHatItem>}
          {tab === 0 && dlgs && dlgs.map((dialog, i) => (
            <>
              <ListCHatItem key={i} onClick={() => dispatch(setDialog(dialog))}>
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
              </ListCHatItem>
            </>
          ))}
          {/* {tab === 1 && groups && groups.map((group, i) => (
            <ListCHatItem key={i} onClick={() => dispatch(setGroup(group))}>
              <div>
                {group.image ?
                  <img src={group.image} /> :
                  `${group.name[0]}`}
              </div>
              <span>
                {group.name}
              </span>
            </ListCHatItem>
          ))}
          {tab === 2 && channels && channels.map((channel, i) => (
            <ListCHatItem key={i} onClick={() => dispatch(setChannel(channel))}>
              <div>
                {channel.image ?
                  <img src={channel.image} /> :
                  `${channel.name[0]}`}
              </div>
              <span>
                {channel.name}
              </span>
            </ListCHatItem>
          ))} */}
        </div>
        <Users open={showUsers && tab === 0}>
          <div>
            <>
              {users && users.map((userr, i) => (
                <>
                  <UsersItem key={i} onClick={() => handleMakeDialog(userr)}>
                    <div>
                      {userr.img_url ? <img src={userr.img_url} /> : `${userr.first_name ? userr.first_name[0] : userr.username[0]}`}
                    </div>
                    <span>
                      {userr.first_name ? `${userr.first_name}` : `${userr.username}`}
                    </span>
                  </UsersItem>
                </>
              ))}
            </>
          </div>
        </Users>
      </ListChatBody>
      <UsersButton vis={tab === 0} colr={showUsers} onClick={handleGetUsers}>
        <IconButton>
          <PersonAdd style={{ width: 20, height: 20 }} />
        </IconButton>
      </UsersButton>
    </ListChat >
  );
};

export default ListChatCom;