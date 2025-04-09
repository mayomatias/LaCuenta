import { usePopupContext } from '../../../../../provider/AddExpensePopUpProvider';
import React, { useEffect, useState } from 'react'
import { DeleteIcon, EditIcon, Modal, ModalButtons, ModalContent, Overlay, PopUpContainer } from './ExpenseDetailPopUp.style';
import { deleteExpenseById } from '../../../../../services/expenses/deleteExpenseById';
import { createUserSharedExpense } from '../../../../../services/users/createUserSharedExpense';
import { getCategories } from '../../../../../services/categoriesApi';
import { getUsers } from '../../../../../services/users/getUsers';
import { CheckIcon, CrossIcon } from '../../AddExpensePopup/AddExpensePopup.style';
import { updateExpenseById } from '../../../../../services/expenses/updateExpenseById';
import { createExpense } from '../../../../../services/expenses';

export const ExpenseDetailPopUp = ({refreshFather}) => {
  const {isExpenseDetailOpen, setIsExpenseDetailOpen} = usePopupContext()
  const {isOpen, expense, currentDate} = isExpenseDetailOpen
  
  const dateForEditableInput = ( currentDate?.year + '-' + expense?.date.split('-').at(1) + '-' +  expense?.date.split('-').at(0));
  

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({ ...expense });

  const [amount, setAmount] = useState(expense?.amount)
  const [date, setDate] = useState(dateForEditableInput)
  const [category, setCategory] = useState(expense?.category)
  const [expenseDescription, setExpenseDescription] = useState(expense?.expenseDescription)
  const [user, setUser] = useState(expense?.user)

  const [usersData, setUsersData] = useState()
  const [categories, setCategories] = useState()
   
  useEffect(() => {
    getCategories().then((e) => setCategories(e[0].categories))
    getUsers().then(setUsersData)
  }, [])

  useEffect(() => {
    setAmount(expense?.amount)
    setDate(dateForEditableInput)
    setCategory(expense?.category)
    setExpenseDescription(expense?.expenseDescription)
    setUser(expense?.user)
  
  }, [isExpenseDetailOpen])
  


  const handleDelete = async() => {
    await deleteExpenseById(currentDate.year, currentDate.month, expense.id)
    await createUserSharedExpense({year: currentDate.year, monthName: currentDate.month, user: expense.user})
    refreshFather(date);
    setIsConfirmModalOpen(false);
    setIsExpenseDetailOpen(false)
  }

  const handleUpdate = async() => {

    
    if (dateForEditableInput.split('-').at(1) === date.split('-').at(1)) {
      await updateExpenseById(currentDate.year, currentDate.month, expense.id, {
        amount,
        date,
        category,
        expenseDescription,
        user
      })
      const year = date.split('-').at(0)
      const monthNumber = parseInt(date.split('-').at(1), 10) - 1; // Restamos 1 porque getMonth() usa 0-11
      const monthName = new Date(year, monthNumber).toLocaleString("en-US", { month: "long" });

      usersData.map(async(user) => {
        
        await createUserSharedExpense({year, monthName, user: user.id})
        
      })

    } else {
      await deleteExpenseById(currentDate.year, currentDate.month, expense.id)
      usersData.map(async(user) => {
        await createUserSharedExpense({year: currentDate.year, monthName: currentDate.month, user: user.id})
      })
      const year = date.split('-').at(0)
      const monthNumber = parseInt(date.split('-').at(1), 10) - 1; // Restamos 1 porque getMonth() usa 0-11
  
      const monthName = new Date(year, monthNumber).toLocaleString("en-US", { month: "long" });
      
      await createExpense({amount,date,category,user,expenseDescription, year, monthName})

      usersData.map(async(user) => {
        await createUserSharedExpense({year, monthName, user: user.id})
      })
    }
    
    
    setIsEditing(false)
    setIsExpenseDetailOpen(false)
    refreshFather()
  }
  
  

  return (
    <>
        <Overlay $isPopupOpen={isOpen} onClick={(e) => { setIsEditing(false); setIsExpenseDetailOpen(false)}}>
          <PopUpContainer $isPopupOpen={isOpen} onClick={(e) => e.stopPropagation()}>
            <h3>Expense detail</h3>
            
          {isEditing ? (
            <>
          
              <select name="user" value={user} onChange={(e) => setUser(e.target.value)}>
                {usersData?.map((user) => <option key={user.id} value={user.id}>{user.id}</option>)}
              </select>

              <input type="date" name="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
              <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='€' />
                          
              <select name="categories" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories?.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>

              <input type="text" name="description" value={expenseDescription} onChange={(e) => {setExpenseDescription(e.target.value)}} placeholder='Description' />
            </>
          ) : (
            <>
              <p>{expense?.user}</p>
              <p>{expense?.date}-{currentDate?.year}</p>
              <p>{expense?.amount}€</p>
              <p>{expense?.category}</p>
              {expense?.expenseDescription == undefined ? <p>No Description</p>: <p>{expense?.expenseDescription}</p>}
            </>
          )}
            <div>
            {isEditing ? (
              <>
                <CrossIcon onClick={() => setIsEditing(false)}/>
                <CheckIcon onClick={handleUpdate}/>
              </>
            ) : (
              <>
                <DeleteIcon onClick={() => setIsConfirmModalOpen(true)}/>
                <EditIcon onClick={() => setIsEditing(true)}/>
              </>
            )}
            </div>
            

          </ PopUpContainer>
        </Overlay>
    
         {/* Modal de confirmación */}
        {isConfirmModalOpen && (
          <Modal>
            <ModalContent>
              <h3>Delte expense?</h3>
              <ModalButtons>
                <button onClick={() => setIsConfirmModalOpen(false)}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
    </>
  )
}

