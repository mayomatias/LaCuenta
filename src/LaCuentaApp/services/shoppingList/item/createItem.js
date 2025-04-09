import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../../firebase";

// CREATE
export const createItem = async(obj) => {
    const colRef = collection(db, 'shoppingList');
    const data = await addDoc(colRef, obj);
    return data.id;
}
