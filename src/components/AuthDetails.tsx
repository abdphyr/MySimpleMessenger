import { FC, SetStateAction } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material'
import { Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface AuthDetailsProps {
  email: string;
  setEmail: React.Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
  username?: string;
  setUsername?: React.Dispatch<SetStateAction<string>>;
  handleSubmitUser: (e: React.FormEvent) => void;
}

const AuthDetails: FC<AuthDetailsProps> = (props) => {
  const navigate = useNavigate()
  const { email, password, username } = props
  const { setEmail, setPassword, setUsername, handleSubmitUser } = props

  return (
    <Main>
      <div>
        <Image>
          <div>
            <Send color='primary' />
          </div>
        </Image>
        <Form usnm={username} onSubmit={handleSubmitUser}>
          {(typeof username === 'string' && setUsername) &&
            <FormItem>
              <Label clr={username.length > 0 && username.length < 5} htmlFor="username">Username</Label>
              <TextField value={username} onChange={(e) => setUsername(e.target.value)} size='small' fullWidth id='username' />
            </FormItem>
          }
          <FormItem>
            <Label clr={email.length > 0 && email.length < 8} htmlFor="email">Email</Label>
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} size='small' fullWidth id='email' type='email' />
          </FormItem>
          <FormItem>
            <Label clr={password.length > 0 && password.length < 8} htmlFor="password">Password</Label>
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} size='small' fullWidth id='password' type='password' />
          </FormItem>
          {typeof username === 'string' ? 
          <Submit disabled={!(username.length >= 5 && email.length >= 8 && password.length >= 8)} type='submit' />
          :
          <Submit disabled={!(email.length >= 8 && password.length >= 8)} type='submit' />
          }
        </Form>
        <div style={{ textAlign: 'center' }}>
          {typeof username === 'string' ?
            <AuthNavigate onClick={() => navigate('/login')}>
              Login
            </AuthNavigate>
            :
            <AuthNavigate onClick={() => navigate('/register')}>
              Register
            </AuthNavigate>
          }
        </div>
      </div>
    </Main>
  );
};

export default AuthDetails;

const AuthNavigate = styled('button')`
  border: none;
  outline: none;
  background-color: transparent;
  color: #113dd9;
  font-size: 14px;
  cursor: pointer;
`

const Submit = styled('input')`
  margin-top: 10px;
  width: 100%;
  height: 40px;
  background-color: ${p => p.disabled ? '#7383be' : '#113dd9'};
  border-radius:5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 16px;

`
const FormItem = styled('div')`
  margin-bottom: 15px;
`
const Label = styled('label') <{ clr?: boolean }>`
  color:${p => p.clr ? 'red' : 'black'};
`

const Form = styled('form') <{ usnm: string | undefined }>`
  @media (max-width: 576px){
    width: 260px;
    padding: 10px;
  };
  width: 400px;
  height: ${p => p.usnm ? 300 : 240};
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
`

const Image = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  div{
    transform: rotate(-30deg);
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
      width: 70px;
      height: 70px;
    }
  }
`

const Main = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`