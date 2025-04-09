import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "./firebase";

const collectionName = 'items';


export const createExpenseYear = async(year) => {
    const res = await setDoc(doc(db, "expenses", year), {});
    return res;
}



export const createNewExpense = async(obj, uuid) => {
    const colRef = collection(db, 'expenses');
    const data = await addDoc(colRef, obj);
    return data;
}

// UPDATE
export const updateItem = async (id, obj) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj)
}

// READ
export const getExpenses= async ()  => {
    const colRef = collection(db, 'expenses');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

export const getExpensesByMonth= async (year, monthName)  => {
  const expensesCollection = collection(db, "expenses", year, "months", monthName, 'monthExpenses');
  const result = await getDocs(query(expensesCollection));
  return getArrayFromCollection(result);
}

export const getTasks= async (uuid)  => {
    const colRef = collection(db, 'users', uuid, 'tasks');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}


// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getItemsByCondition = async (value) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('age', '==', value)));
    return getArrayFromCollection(result);
}

export const getItemById = async (id) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data();
}

// DELETE
export const deleteItem = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}

