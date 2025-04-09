import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../../firebase";

export const deleteItem = async (id) => {
    const docRef = doc(db, 'shoppingList', id);
    await deleteDoc(docRef);
}