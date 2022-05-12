import { FC } from 'react';
import { Loader } from 'rsuite'
import styled from 'styled-components';

const LoaderCom: FC = () => {
  return (
    <Load>
      <Small>
        <Loader size='sm' />
      </Small>
      <Medium>
        <Loader size='md' />
      </Medium>
    </Load>
  );
};

export default LoaderCom;
const Small = styled('div')`
  @media (min-width: 576px){
    display: none
  }
`
const Medium = styled('div')`
  @media (max-width: 576px){
    display: none
  }
`
const Load = styled('div')`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7f6fc;
  z-index: 100000; 
  display: flex;
  align-items: center; 
  justify-content: center;
  width: 100vw; 
  height: 100vh
`