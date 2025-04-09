import React, { useEffect, useState } from 'react'
import { createUserSharedExpense } from '../../../../services/users/createUserSharedExpense'
import { getUsers } from '../../../../services/users/getUsers'
import { getSharedExpensesByMonth } from '../../../../services/users/getUsersSharedExpenses'
import { UserCard } from './components/UserCard'
import { ExpenseChart } from './components/ExpenseChart'
import styled from 'styled-components'
import { ExpenseByCategory } from './components/ExpenseByCategory'

const Card = styled.div`
  background:#f0f0f0;;
  margin-bottom: 10px;
  border-radius: 0px 0px 12px 12px;
  margin-bottom: 65px;
  padding: 16px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3{
    margin-top: 25px;
    text-align: center;
  }

`;

export const ExpenseCard = ({currentMonth, expensesData}) => {
  const [userTotalExpensed, setUserTotalExpensed] = useState();
  const [sortedExpense, setSortedExpense] = useState(expensesData)
  const{year, month} = currentMonth


  useEffect(() => {
    setSortedExpense(expensesData.monthExpenses.sort((a, b) => {
      if (a.category < b.category) {
        return -1;
      }
      if (a.category > b.category) {
        return 1;
      }
      return 0;
    })
  );
    
  }, [expensesData])
  


  useEffect(() => {  
    getSharedExpensesByMonth(year, month).then(setUserTotalExpensed)
  }, [currentMonth])
  
  
  return (
    <Card>
      {/* <div style={{textAlign:'center'}}>Usuarios - Categorias </div> */}
      {userTotalExpensed?.map((user) => {
        return(
          <UserCard key={user.user} user={user}/>
        )
      })}
      <h3>Gastos por Categoría</h3>
      <ExpenseByCategory expensesData={sortedExpense}/>
      <ExpenseChart expensesData={sortedExpense}/>
    </Card>
  )
}
