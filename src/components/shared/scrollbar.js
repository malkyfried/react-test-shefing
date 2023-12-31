import styled from 'styled-components'

const CustomScrollbar = styled.div`
  max-height: '300px';
  overflow-y: auto;
  scrollbar-color: 'green';
  scrollbar-width: thin;

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 9px;
    background-color: 'red';
  }

  &::-webkit-scrollbar-thumb {
    background-color: 'yellow';
    border-radius: 5px;
    border: none;
  }

  @media (max-width: 480px) {
    overflow-y: auto;
    overflow-x: auto;
  }

  @media (max-width: 768px) {
    overflow-y: auto;
    overflow-x: unset;
  }
`;

export default CustomScrollbar