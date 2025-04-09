import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../firebase";


// CREATE
export const createExpense = async (obj) => {
  try {
    const { year, monthName, ...expenseData } = obj; // Extraemos year y month del objeto
    
    if (!year || !monthName) {
      throw new Error("El año y el mes son obligatorios");
    }

    // Referencias a documentos del año y mes
    const yearRef = doc(db, "expenses", year);
    const monthRef = doc(db, "expenses", year, "months", monthName);

    // Verificar si el año existe, si no, crearlo
    const yearSnap = await getDoc(yearRef);
    if (!yearSnap.exists()) {
      await setDoc(yearRef, { createdAt: new Date() });
    }

    // Verificar si el mes existe dentro del año, si no, crearlo
    const monthSnap = await getDoc(monthRef);
    if (!monthSnap.exists()) {
      await setDoc(monthRef, { createdAt: new Date() });
    }

    // Guardar el expense dentro de la subcolección del mes
    const expensesCollection = collection(db, "expenses", year, "months", monthName, 'monthExpenses');
    const expenseDoc = await addDoc(expensesCollection, expenseData);

    return expenseDoc.id; // Retorna el ID del nuevo gasto
  } catch (error) {
    console.error("Error al crear el expense:", error);
    throw error;
  }
};
