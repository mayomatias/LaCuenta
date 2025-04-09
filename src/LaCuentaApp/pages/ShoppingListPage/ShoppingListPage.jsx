import React, { useState } from 'react'
import { CreateItem } from './components/CreateItem'
import { ItemList } from './components/ItemList'

export const ShoppingListPage = () => {
  const [refresh, setRefresh] = useState(true);

  const handleRefresh = () => {
    setRefresh(!refresh)
  }


  return (
    <>
      <CreateItem refreshFather={handleRefresh} />
      <ItemList refresh={refresh}/>
    </>
  )
}
