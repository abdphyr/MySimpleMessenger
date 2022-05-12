import styled from 'styled-components';

export const ContentChat = styled('div') <{ open?: boolean }>`
  @media (max-width: 576px){
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 1000;
    transition: all 0.3s ease;
    transform: translateX(${p => p.open ? 0 : -100}%);
    overflow-y: hidden ;
    background-color: #e2e4e9;
  }
  @media (min-width:576px){
    display:flex;
    flex-direction: column;
    width: 60%;
    height: 100vh;
    background-color: #e2e4e9;
    display: ${p => p.open ? 'flex': "none"}
  }
`

export const TopInfo = styled('div')`
  height: 50px;
  background-color: #f7f6fc;
  /* background-color: #d1c7ff; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1) */
`

export const MessageSpace = styled('div')`
  overflow-y: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const Messages = styled('div')`
  padding: 0 20px;
  @media (min-width: 991px){
    padding: 0 80px;
  };
  overflow-y: auto;  
  &::-webkit-scrollbar {
    width: 5px;
    
    background-color: #e2e4e9;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 50px;
  }
`
export const WriteMessage = styled('div')`
  height: 80px;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  @media (max-width: 576px){
    height: 220px;
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
  }
`
export const WriteTools = styled('form')`
  margin: 0 20px;
  @media (min-width: 991px){
    margin: 0 80px;
  };
  height: 40px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`
export const WriteTextField = styled('div')`
  width: 100%;
  ::placeholder{
    font-family: 'Open Sans', sans-serif;
    color: red;
  }
  div > div fieldset {
    border: none;
  }
`