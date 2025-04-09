import { getExpensesByUser } from '../expenses/getExpensesByUser';
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";


// CREATE
// CREATE
export const createUserSharedExpense = async (obj) => {
  try {
    const { year, monthName, user } = obj;

    if (!year || !monthName || !user) {
      throw new Error("El usuario, año y mes son obligatorios");
    }

    // Referencias a documentos del año y mes
    const yearRef = doc(db, "users", user, "sharedExpenses", year);
    const monthRef = doc(db, "users", user, "sharedExpenses", year, "months", monthName);

    // Verificar si el año existe, si no, crearlo
    const yearSnap = await getDoc(yearRef);
    if (!yearSnap.exists()) {
      await setDoc(yearRef, { createdAt: new Date() });
    }

    // Verificar si el mes existe dentro del año, si no, crearlo
    const monthSnap = await getDoc(monthRef);
    if (!monthSnap.exists()) {
      await setDoc(monthRef, { createdAt: new Date(), total: 0 }); // Iniciar total en 0
    }

    // Obtener los gastos del usuario en ese mes
    const expenses = await getExpensesByUser(year, monthName, user);
    
    // Calcular el total
    let total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    
    // Actualizar el total en el documento del mes
    await updateDoc(monthRef, { total });

    return `Total actualizado: ${total}`;
  } catch (error) {
    console.error("Error al crear el expense:", error);
    throw error;
  }
};