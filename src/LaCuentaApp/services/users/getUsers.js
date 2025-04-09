import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";
import { getArrayFromCollection } from '../utils/getArrayFromCollection'

// READ
export const getUsers = async (year, monthName)  => {
  const expensesCollection = collection(db, "users");
  const result = await getDocs(query(expensesCollection));
  return getArrayFromCollection(result);
}
