import { FC, useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import { onValue, set, child } from 'firebase/database';
import { messagesDBRef } from '../messages/messages.db';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config.store';
import { TextField, IconButton } from '@mui/material'
import { Send, ModeEdit } from '@mui/icons-material';
import { ContentChat } from '../styledComponents/ContentChatComDetails';
import { TopInfo, MessageSpace, Messages } from '../styledComponents/ContentChatComDetails';
import { WriteMessage, WriteTools, WriteTextField } from '../styledComponents/ContentChatComDetails';
import { IMessage } from '../messages/message';
import MessagesCom from './MessagesCom';
import ContentChatInfo from './ContentChatInfo';

const ContentChatCom: FC = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const user = useSelector((state: RootState) => state.user.user)
  const chats = useSelector((state: RootState) => state.chat)
  const { open } = chats

  const [text, setText] = useState('')
  const [messages, setMessages] = useState([] as IMessage[])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (text.length !== 0) {
      const message = {
        message_id: v4(),
        content: text,
        date: Date.now(),
        user: user
      }
      setText('')
      await set(child(messagesDBRef(chats), `/${message.message_id}`), message)
    }
  }

  useEffect(() => {
    onValue(messagesDBRef(chats), (snapshot) => {
      if (snapshot.val()) {
        const msgs = snapshot.val()
        const newMsgs = Object.values(msgs) as IMessage[]
        const sortedMsgs = newMsgs.sort((a, b) => a.date - b.date)
        setMessages(sortedMsgs)
      } else {
        setMessages([])
      }
    })
  }, [open, chats])

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ block: 'end' })
    }
  }, [messages])

  return (
    <ContentChat open={open} ref={contentRef}>
      <TopInfo>
        <ContentChatInfo />
      </TopInfo>
      <MessageSpace>
        <Messages>
          <MessagesCom messages={messages} user={user} />
        </Messages>
      </MessageSpace>
      <WriteMessage ref={contentRef}>
        <WriteTools onSubmit={handleSend}>
          <IconButton disabled={text.length === 0}>
            <label style={{ margin: 0, padding: 0 }} htmlFor="message">
              <ModeEdit color={text.length === 0 ? 'disabled' : 'primary'} />
            </label>
          </IconButton>
          <WriteTextField>
            <TextField value={text} onChange={(e) => setText(e.target.value)} fullWidth size='small' placeholder='Enter text...' id='message' />
          </WriteTextField>
          <IconButton onClick={handleSend} disabled={text.length === 0} >
            <Send color={text.length === 0 ? 'disabled' : 'primary'} />
          </IconButton>
        </WriteTools>
      </WriteMessage>
    </ContentChat>
  );
};

export default ContentChatCom;