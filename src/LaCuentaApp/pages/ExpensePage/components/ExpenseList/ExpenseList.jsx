import React, { useEffect, useState } from 'react'
import { Table } from './ExpenseList.styles'
import { usePopupContext } from '../../../../provider/AddExpensePopUpProvider'
import { ExpenseDetailPopUp } from './components/ExpenseDetailPopUp'

export const ExpenseList = ({expensesData, currentDate, refreshFather}) => {
  const [holdTimeout, setHoldTimeout] = useState(null);
  const [sortedExpenses, setSortedExpenses] = useState()

  const {isExpenseDetailOpen, setIsExpenseDetailOpen} = usePopupContext()

  const handleTouchStart = (expense, currentDate) => {
    const timeout = setTimeout(() => {
      setIsExpenseDetailOpen({isOpen: true,expense,currentDate});
      // Aquí puedes abrir un modal, mostrar opciones, etc.
    }, 500); // 🔹 Después de 1 segundo, se activa el evento

    setHoldTimeout(timeout);
  };

  const handleTouchEnd = () => {
    clearTimeout(holdTimeout); // 🔹 Si suelta antes, cancela el evento
  };
  

  const {monthExpenses, monthTotal} = expensesData
  
  // Ordenar los gastos por fecha
  const sortExpenses = () => {
    const sorted = monthExpenses?.map((expense) => {
      const [month, day] = expense.date.split('-');
      return { ...expense, date: `${day}-${month}` };
    }).sort((a, b) => {
      const [dayA, monthA] = a.date.split('-').map(Number);
      const [dayB, monthB] = b.date.split('-').map(Number);
      const dateA = new Date(2023, monthA - 1, dayA); // Año ficticio
      const dateB = new Date(2023, monthB - 1, dayB); // Año ficticio
      return dateB - dateA; // Orden descendente (más reciente primero)
    });

    setSortedExpenses(sorted);
  };


  useEffect(() => {
    sortExpenses();
  }, [expensesData]);

  


  return (
    <>
    <ExpenseDetailPopUp refreshFather={refreshFather}/>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {
              sortedExpenses?.map((expense) => {
                return(
                  <tr key={expense.id}
                    onDoubleClick={() => setIsExpenseDetailOpen({isOpen: true, expense, currentDate})}
                    onTouchStart={() => handleTouchStart(expense, currentDate)}
                    onTouchEnd={handleTouchEnd}
                  >
                    <td>{expense.date}</td>
                    <td>{parseFloat(expense.amount).toFixed(2)}€</td>
                    <td>{expense.category}</td>
                    <td>{expense.user}</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="1">Total:</th>
              <td ><b>{monthTotal}€</b></td>
            </tr>
          </tfoot>
        </Table>
    </>
  )
}
