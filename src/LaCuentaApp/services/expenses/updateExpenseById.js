import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";
import { getArrayFromCollection } from '../utils/getArrayFromCollection'

// UPDATE
export const updateExpenseById = async (year, monthName, expenseId, updatedData) => {
  try {
    const expenseRef = doc(db, "expenses", year, "months", monthName, "monthExpenses", expenseId);
    await updateDoc(expenseRef, updatedData);
  } catch (error) {
    console.error("Error actualizando el expense:", error);
  }
};