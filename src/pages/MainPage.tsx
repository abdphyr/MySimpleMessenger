import { FC } from 'react';
import { Container } from '@mui/material';
import styled from 'styled-components';
import ListChatCom from '../components/ListChatCom';
import ContentChatCom from '../components/ContentChatCom';

const MainPage: FC = () => {
  return (
    <Container >
      <Chat>
        <ListChatCom />
        <ContentChatCom />
      </Chat>
    </Container>
  );
};

export default MainPage;

const Chat = styled('div')`
  display: flex;
  border-top: none;
  border-bottom: none;
  @media (max-width: 576px){
    flex-direction: column
  }
  flex-direction: row;
  box-sizing: border-box;
`