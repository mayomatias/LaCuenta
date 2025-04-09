import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";
import { getArrayFromCollection } from '../utils/getArrayFromCollection'

// READ
export const getExpensesByMonth = async (year, monthName)  => {
  const expensesCollection = collection(db, "expenses", year, "months", monthName, 'monthExpenses');
  const result = await getDocs(query(expensesCollection));
  const monthExpenses = getArrayFromCollection(result);

  const monthTotal = await getTotal(monthExpenses)

  //return monthExpenses
  return {monthExpenses, monthTotal}
}


const getTotal = async(monthExpenses) => {

  let monthTotal = 0;
  
  monthExpenses.map((expense) => {
    monthTotal += parseFloat(expense.amount)
  })

  return monthTotal.toFixed(2);
}
    