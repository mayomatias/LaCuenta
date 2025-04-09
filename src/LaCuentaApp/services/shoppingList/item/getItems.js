import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "../../firebase";
import { getArrayFromCollection } from '../../utils/getArrayFromCollection';

export const getItems= async ()  => {
    const colRef = collection(db, 'shoppingList');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}