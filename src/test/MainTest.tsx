import { FC, useState, useEffect } from 'react';
import { set, remove, onValue, get, child } from 'firebase/database';
import styled from 'styled-components';
import { messagesDBRef, messageDBRef } from '../app/rdb';
import { v4, v1, v3, v5 } from 'uuid';

const MainTest: FC = () => {
  const [mes, setMes] = useState('')
  const [mess, setMess] = useState([] as { id: string, mes: string }[])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newMes = {
      id: v4(),
      mes
    }
    setMes('')
    set(messageDBRef(newMes.id), newMes)
    // set(child(messagesDBRef, `/${newMes.id}`), newMes)
  }

  const handleDelete = async (item: { id: string, mes: string }) => {
    remove(messageDBRef(item.id))
  }

  useEffect(() => {
    onValue(messagesDBRef, (snapshot) => {
      const mess = [] as { id: string, mes: string }[]
      if (snapshot.val()) {
        Object.keys(snapshot.val()).forEach(item => {
          mess.unshift(snapshot.val()[item])
        })
        setMess(mess)
      } else {
        setMess([])
      }
    })
  }, [])

  return (
    <div className="mainTest">
      Bismillah
      <form onSubmit={handleSubmit}>
        <input value={mes} type="text" onChange={(e) => setMes(e.target.value)} />
        <input type="submit" />
      </form>
      <div>
        {mess &&
          mess.map((item, i) => (
            <div key={i}>
              <span>{item.mes}</span>
              <Button1 size={17} color='red' onClick={() => handleDelete(item)}>Delete</Button1>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MainTest;

const Button1 = styled('button')<{size: number, color: string}>`
  background-color: ${p => p.color ? p.color : 'blue'};
  font-size: ${p => p.size ? p.size : 20}px;
`
