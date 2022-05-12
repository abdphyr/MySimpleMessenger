import styled from 'styled-components';


export const UsersButton = styled('button')<{vis: boolean, colr: boolean}>`
  position: absolute;
  display: ${p => p.vis ? 'block': "none"};
  bottom: 10%;
  right: 10%;
  width: 50px;
  height: 50px;
  border:none;
  outline: none;
  border-radius: 50%;
  background-color: ${p=> p.colr ? '#fff': '#f7f6fc'}
`

export const UsersItem = styled('button')`
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  border-bottom: 0.5px solid #d2cfcf;
  cursor: pointer;
  /* margin: 0 20px; */
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); */
  div{
    margin-right: 20px;
    width: 50px;
    height:50px;
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
    color: #1d1919;
    font-weight: 600;
  }
`

export const Users = styled('div')<{open: boolean}>`
  position: absolute;
  overflow-y: auto;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  transform: translateX(${p => p.open ? 0 : -200}%);
  background-color: #f7f6fc;
  width: 100%;
  height:${p => p.open ? '100vh' : '100%'};
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f7f6fc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 50px;
  }
  /* div{
    padding: 20px;
  } */
`

export const ListChat = styled('div')`
  position: relative;
  overflow-y: hidden;
  @media (max-width: 576px){
    width: 100%;
    height: 100vh;
  }
  height: 100vh;  
  width: 40%;
  background-color: #ffffff;
`
export const ListChatHeader = styled('div')`
  width:100%;
  height: 50px;
`
export const ListChatIcons = styled('div')`
  display: flex;
  justify-content: center;
  text-align: center;
`
export const ListChatBody = styled('div')`
  padding: 0 20px;
  position: relative;
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f7f6fc;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 50px;
  }
  div{
    /* overflow-y: scroll;
    height: 100%; */
  }
`

export const ListCHatItem = styled('button')`
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  border-bottom: 1px solid #f7f6fc;
  cursor: pointer;
  /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); */
  div{
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