import styled from 'styled-components';
import { createItem } from '../../../services/shoppingList/item/createItem';
import { useRef, useState } from 'react';

export const CreateItem = ({refreshFather}) => {
  const [item, setItem] = useState('');
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
      handleCreateItem();
    }
  };

  const handleCreateItem = () => {
    createItem({ item });
    setItem('')
    refreshFather()
    inputRef.current.focus();
  };

  return (
    <CreateItemContainer>
      <Input ref={inputRef} onKeyUp={handleKeyPress} type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="New item..." />
      <AddButton onClick={handleCreateItem}>Add</AddButton>
    </CreateItemContainer>
  );
};



const CreateItemContainer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 5px;
  //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }
`;
