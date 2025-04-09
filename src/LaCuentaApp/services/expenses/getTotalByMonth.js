import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";
import { getArrayFromCollection } from '../utils/getArrayFromCollection';

export const getTotalByMonth = async (year, monthName, user) => {
  try {
    const expensesCollection = collection(db, "expenses", year, "months", monthName, "monthExpenses");

    // Crear la consulta para filtrar por usuario
    const q = query(expensesCollection);

    // Obtener los documentos que coinciden con la consulta
    const result = await getDocs(q);

    let monthTotal = 0;
    const monthExpenses = getArrayFromCollection(result);

    monthExpenses.map((expense) => {
      monthTotal += parseFloat(expense.amount)
    })
        
    return monthTotal.toFixed(2);
  } catch (error) {
    console.error("Error al obtener los expenses del usuario:", error);
    throw error;
  }
};