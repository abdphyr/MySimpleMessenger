import { FC, useState } from 'react';
import { useUserRegister } from '../auth/useRegister';
import { useSaveUser } from '../auth/auth.db';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../redux/user.slice'
import AuthDetails from '../components/AuthDetails';
import { IUser } from '../auth/auth';
import LoaderCom from '../components/LoaderCom';

const RegisterPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync: register, isLoading: regLoading, error } = useUserRegister()
  const { mutateAsync: setDB, isLoading: setDBLoading } = useSaveUser()

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault()
    register({
      email,
      password
    }, {
      onSuccess: (user) => {
        const newUser: IUser = {
          userID: user.user.uid,
          username,
          email,
          password,
          dialog: true,
          chat: false,
          channel: false,
          role: "member",
          channels: [],
          chats: [],
          dialogs: [],
          first_name: '',
          last_name: '',
          img_url: ''
        }
        navigate('/')
        setDB(newUser, {
          onSuccess: (data) => {
            dispatch(userRegister(newUser))
          },
          onError: (err) => {
            alert(err)
            console.log(err)
            navigate('/register')
          }
        })
      },
      onError: (err) => {
        alert(err)
        console.log(err)
        navigate('/register')
      }
    })
  }
  if (error){
    return <>Error {error}</>
  }
  if (regLoading || setDBLoading) {
    return <LoaderCom />
  }
  return (
    <AuthDetails username={username} setUsername={setUsername}
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      handleSubmitUser={handleSubmitUser}
    />
  );
};

export default RegisterPage;

