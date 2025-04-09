import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";

export const deleteExpenseById = async (year, monthName, expenseId) => {
  const expenseRef = doc(db, "expenses", year, "months", monthName, "monthExpenses", expenseId);
  const res = await deleteDoc(expenseRef);
  return res;
  
}
