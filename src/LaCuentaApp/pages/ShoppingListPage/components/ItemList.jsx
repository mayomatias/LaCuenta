import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getItems } from '../../../services/shoppingList/item/getItems';
import { ItemCard } from './ItemCard';

export const ItemList = ({refresh}) => {
  const [items, setItems] = useState([]);

  const handleRefresh = () => {
    getItems().then((data) => {
      const sortedItems = data.sort((a, b) => a.item.localeCompare(b.item));
      setItems(sortedItems);
    });
  }

  useEffect(() => {
    getItems().then((data) => {
      const sortedItems = data.sort((a, b) => a.item.localeCompare(b.item));
      setItems(sortedItems);
    });
  }, [refresh]);

  return (
    <ListContainer>
      {items?.map((item) => (
        <ItemCard key={item.id} item={item} refreshFather={handleRefresh}/>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-bottom: 55px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
`;