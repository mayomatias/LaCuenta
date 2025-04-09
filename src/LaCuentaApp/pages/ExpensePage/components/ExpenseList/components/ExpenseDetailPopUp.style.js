import styled from 'styled-components';
import { MdDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";



export const DeleteIcon = styled(MdDelete)`
  width: 30px;
  height: 30px;
  color: red;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`

export const EditIcon = styled(MdOutlineEdit)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`


export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Oscurece el fondo */
  display: ${({ $isPopupOpen }) => ($isPopupOpen ? 'flex' : 'none')};
  padding-top: 75px;
  justify-content: center;
  transition: opacity 10s ease-in-out;
  opacity: ${({ $isPopupOpen }) => ($isPopupOpen ? '1' : '0')};
  backdrop-filter: blur(5px); /* Efecto difuminado */
`;


export const PopUpContainer = styled.div`
  display: ${(props) => (props.$isPopupOpen ? 'block' : 'none')};
  width: 300px;
  height: 400px;
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  position: relative;
  p, input, select {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  >div{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
  }
`
//MODAL


export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 250px;
  border-radius: 8px;
  text-align: center;
`;

export const ModalButtons = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-around;

  button {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
  }

  button:first-child {
    background: gray;
    color: white;
  }

  button:last-child {
    background: red;
    color: white;
  }
`;
