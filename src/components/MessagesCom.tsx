import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IUser } from '../auth/auth';
import { IMessage } from '../messages/message';

interface IMessageProps {
  messages: IMessage[];
  user: IUser | null
}

const MessagesCom: FC<IMessageProps> = ({ messages, user }) => {
  const messagesRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ block: 'end' })
    }
  }, [messages])
  
  return (
    <MessagesField ref={messagesRef}>
      {messages.map((message, i) => {
        return (<Message key={i} isAuthor={message.user.userID === user?.userID}>
          <span>
            {message.content}
          </span>
        </Message>)
      })}
    </MessagesField>
  );
};

export default MessagesCom;

const MessagesField = styled('div')``

export const Message = styled('div') <{ isAuthor: boolean }>`
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: ${p => p.isAuthor ? "flex-end" : "flex-start"};
  margin: 15px 0;
  overflow-x: hidden;
  span {
    max-width: 80%;
    border-radius: 10px;
    border-top-left-radius:${p => p.isAuthor ? 10 : 0}px;
    border-bottom-right-radius:${p => p.isAuthor ? 0 : 10}px;
    font-size: 14px;
    padding: 10px;
    background-color: #fff;
  }
  @media (min-width: 991px) {
    span {
      max-width: 50%;
    }
  }
`
