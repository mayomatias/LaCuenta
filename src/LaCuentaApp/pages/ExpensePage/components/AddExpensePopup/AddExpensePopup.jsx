import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../../provider/UserProviderRegisterLogin'
import { getCategories } from '../../../../services/categoriesApi'
import { CheckIcon, CrossIcon, Overlay, PopUpContainer } from './AddExpensePopup.style'
import { usePopupContext } from '../../../../provider/AddExpensePopUpProvider'
import { createExpense, getExpensesByMonth } from '../../../../services/expenses/'
import { getUsers } from '../../../../services/users/getUsers'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { createUserSharedExpense } from '../../../../services/users/createUserSharedExpense'


export const AddExpensePopup = ({refreshFather, dateFromFather}) => {

  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [expenseDescription, setExpenseDescription] = useState('')
  const [user, setUser] = useState('')

  const resetForm = () => {
    setAmount('')
    setDate('')
    setCategory('')
    setExpenseDescription('')
    setUser('')
  }

  
  const [usersData, setUsersData] = useState()
  const [categories, setCategories] = useState()
 
  const {isPopupOpen, setIsPopupOpen} = usePopupContext()


  const handleNewExpense = async() => {
    const year = date.split('-').at(0)
    const monthNumber = parseInt(date.split('-').at(1), 10) - 1; // Restamos 1 porque getMonth() usa 0-11

    const monthName = new Date(year, monthNumber).toLocaleString("en-US", { month: "long" });
    
    await createExpense({amount,date,category,user,expenseDescription, year, monthName})
    createUserSharedExpense({year, monthName, user})
    resetForm()
    refreshFather(date)
    setIsPopupOpen(false)
  } 

  useEffect(() => {
    
    const adjustedDate = new Date(Date.UTC(dateFromFather?.year, dateFromFather?.monthIndex, 1));
    if(adjustedDate != 'Invalid Date'){

      const formattedDate = adjustedDate?.toISOString().split('T')[0];       
      setDate(formattedDate);
    }

    getCategories().then((e) => setCategories(e[0].categories))
    getUsers().then(setUsersData)

  }, [dateFromFather])
  

  return (
    <Overlay $isPopupOpen={isPopupOpen} onClick={(e) => setIsPopupOpen(false)}>
      <PopUpContainer $isPopupOpen={isPopupOpen} onClick={(e) => e.stopPropagation()}>
        <h3>Add Expense</h3>
        
        <input type="number" name="amount" value={amount}  placeholder='€' onChange={(e) => {setAmount(e.target.value)}} required/>
        
        <input type="date" name="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
        
        <select name="categories" value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Category</option>
          {categories?.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>

        <select name="user" value={user} onChange={(e) => setUser(e.target.value)} required>
          <option value="" disabled>User</option>
          {usersData?.map((user) => <option key={user.id} value={user.id}>{user.id}</option>)}
        </select>

        <input type="text" name='expenseDescription' value={expenseDescription} placeholder='Description' onChange={(e) => setExpenseDescription(e.target.value)}/>
        <div>
          <CrossIcon onClick={() => setIsPopupOpen(false)}/>
          <CheckIcon onClick={handleNewExpense}/>
        </div>
      </ PopUpContainer>
    </Overlay>
  )
}
