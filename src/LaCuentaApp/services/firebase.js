import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Exposición de funciones de Firestore y Auth
export { collection, doc, addDoc, getDoc, setDoc, getDocs, query, updateDoc, deleteDoc, where, onSnapshot, documentId } from "firebase/firestore";
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail, sendEmailVerification } from "firebase/auth";
export { uploadBytes, getDownloadURL, ref } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_PROJECT_ID + '.firebaseapp.com',
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_PROJECT_ID + ".appspot.com",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

// Función para configurar la persistencia de la sesión
export const setAuthPersistence = async () => {
    try {
        // Setea la persistencia antes de hacer login o cualquier otra operación
        await setPersistence(auth, browserLocalPersistence);
    } catch (error) {
        console.log(error);
        
    }
};

// Escuchar el estado de la autenticación del usuario
export const listenAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);  // Llama al callback con el usuario cuando haya cambios en el estado
    });
};