import React, { useState } from 'react';
import styled from 'styled-components';
import { deleteItem } from '../../../services/shoppingList/item/deleteItem';

export const ItemCard = ({ item, refreshFather }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteItem(item.id);
    refreshFather();
    setShowModal(false);
  };

  return (
    <>
      <Card>
        <ItemText>{item.item}</ItemText>
        <DeleteButton onClick={handleDelete}>X</DeleteButton>
      </Card>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <p>Delete {item.item}?</p>
            <ModalButtons>
              <ModalButton  onClick={() => setShowModal(false)} $confirm>Cancel</ModalButton>
              <ModalButton onClick={confirmDelete} >Delete</ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemText = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

const DeleteButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #cc0000;
  }
`;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  width: 250px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ModalButton = styled.button`
  background: ${(props) => (props.$confirm ? '#28a745' : '#ff4d4d')};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.confirm ? '#218838' : '#cc0000')};
  }
`;
