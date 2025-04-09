import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification, db, doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc, addDoc, query, where, onSnapshot } from "./firebase";

// READ
export const getCategories= async ()  => {
    const colRef = collection(db, 'categories');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}


const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}

