import React, { useEffect, useState } from 'react'
import { Container } from './ExpensePage.styles'
import { ExpenseList } from './components/ExpenseList/ExpenseList'
import { AddExpensePopup } from './components/AddExpensePopup/AddExpensePopup'
import { getExpensesByMonth } from '../../services/expenses/getExpenses'
import { dateWithoutYear } from './components/ExpenseList/utils/dateWithoutYear'
import { useUserContext } from '../../provider/UserProviderRegisterLogin'
import { usePopupContext } from '../../provider/AddExpensePopUpProvider'
import { ExpensesNavigation, SelectCurrent, TableContainer } from './components/ExpenseList/ExpenseList.styles'
import { ExpenseCard } from './components/ExpenseCard/ExpenseCard'
import { IoMdAdd } from "react-icons/io";
import { VscArrowSwap } from "react-icons/vsc";



export const ExpensePage = () => {

  const [expensesData, setExpensesData] = useState([])
  const [currentMonth, setCurrentMonth] = useState()
  const [toggleListOrChart, setToggleListOrChart] = useState(true)

  const [refresh, setRefresh] = useState(true)
  
  const {setIsPopupOpen} = usePopupContext()
 
  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => {
      let previousMonthIndex = prev.monthIndex - 1;
      let previousYear = prev.year;
  
      // Si retrocede de enero a diciembre del año anterior
      if (previousMonthIndex < 0) {
        previousMonthIndex = 11; // Diciembre
        previousYear = (parseInt(prev.year) - 1).toString();
      }
  
      const previousMonth = new Date(previousYear, previousMonthIndex).toLocaleString("en-US", { month: "long" });
  
      getExpensesByMonth(previousYear, previousMonth)
        .then((e) => setExpensesData({
          monthExpenses: dateWithoutYear(e.monthExpenses),
          monthTotal: e.monthTotal
        }));

      
  
      return {
        month: previousMonth,
        monthIndex: previousMonthIndex,
        year: previousYear,
      };
    });
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      let nextMonthIndex = prev.monthIndex + 1;
      let nextYear = prev.year;
  
      // Si avanza de diciembre a enero del próximo año
      if (nextMonthIndex > 11) {
        nextMonthIndex = 0; // Enero
        nextYear = (parseInt(prev.year) + 1).toString();
      }
  
      const nextMonth = new Date(nextYear, nextMonthIndex).toLocaleString("en-US", { month: "long" });
  
      getExpensesByMonth(nextYear, nextMonth)
        .then((e) => {
          setExpensesData({
            monthExpenses: dateWithoutYear(e.monthExpenses),
            monthTotal: e.monthTotal
          })
        });
  
      return {
        month: nextMonth,
        monthIndex: nextMonthIndex,
        year: nextYear,
      };
    });
  }

  useEffect(() => {

    const currentYear = new Date().getFullYear().toString()
    const currentMonth = new Date(currentYear, new Date().getMonth()).toLocaleString("en-US", { month: "long" });
    setCurrentMonth({
      month: currentMonth,
      monthIndex: new Date().getMonth(),
      year: currentYear,
    });
    getExpensesByMonth(currentYear, currentMonth)
    .then((e) => {
      setExpensesData({
        monthExpenses: dateWithoutYear(e.monthExpenses),
        monthTotal: e.monthTotal
      })
    })


  }, [refresh])
  
  const handleRefresh = (dateData) => {
    if(dateData){
      setCurrentMonth({
        month: currentMonth.month,
        monthIndex: parseInt(dateData.split('-').at(1))-1,
        year: currentMonth.year,
      })
    }

    getExpensesByMonth(currentMonth.year, currentMonth.month)
    .then((e) => {
      setExpensesData({
        monthExpenses: dateWithoutYear(e.monthExpenses),
        monthTotal: e.monthTotal
      })
    }) 
    
    
  }


  return (
    <Container>
      <AddExpensePopup refreshFather={(e) => {handleRefresh(e)}} dateFromFather={currentMonth}/>
      <SelectCurrent>
        <button onClick={handlePreviousMonth}>&lt;&lt;</button>
        <h4>{currentMonth?.month} - {currentMonth?.year}</h4>
        <button onClick={handleNextMonth}>&gt;&gt;</button>
      </SelectCurrent>
      <TableContainer>
        <ExpensesNavigation>
          <VscArrowSwap style={{color: 'white', width: '20px', height: '30px'}} onClick={() => {setToggleListOrChart(!toggleListOrChart)}} />
          <IoMdAdd style={{color: 'white', width: '30px', height: '30px'}} onClick={() => setIsPopupOpen(true)} />
        </ExpensesNavigation>
        {toggleListOrChart ? <ExpenseList expensesData={expensesData} currentDate={currentMonth} refreshFather={handleRefresh}/> : <ExpenseCard currentMonth={currentMonth} expensesData={expensesData}/>}
      </TableContainer>
    </Container>
  )
}
