import { FC, useState } from 'react';
import { useUserLogin } from '../auth/useLogin';
import { getUser } from '../auth/auth.db';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/user.slice'
import AuthDetails from '../components/AuthDetails';
import { useNavigate } from 'react-router-dom';
import LoaderCom from '../components/LoaderCom';

const LoginPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getUserLoading, setGetUserLoading] = useState(false);
  const { mutateAsync: login, isLoading: loginLoading, error } = useUserLogin()

  const handleSubmitUser = (e: React.FormEvent) => {
    e.preventDefault()
    setGetUserLoading(true);
    login({
      email,
      password
    }, {
      onSuccess: (user) => {
        navigate('/')
        getUser(user.user.uid).then(user => {
          dispatch(userLogin(user))
          navigate('/')
          setGetUserLoading(false)
        })
        .catch(err => {
          alert(err)
          console.log(err)
          navigate('/login')
        })
      },
      onError: (err) => {
        alert(err)
        console.log(err)
        navigate('/login')
      }
    })
  }
  if (error) {
    return <>Error {error}</>
  }
  if (loginLoading || getUserLoading) {
    return <LoaderCom />
  }
  return (
    <AuthDetails email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      handleSubmitUser={handleSubmitUser}
    />
  );
};

export default LoginPage;