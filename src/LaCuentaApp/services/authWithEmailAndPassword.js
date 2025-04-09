import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, doc, setDoc, db, GoogleAuthProvider, signInWithPopup, setAuthPersistence, listenAuthState } from "./firebase";


// Función de inicio de sesión
export const signIn = async (email, password) => {
    await setAuthPersistence();  // Asegúrate de que la persistencia se configura antes del inicio de sesión.
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
}

// Obtener ID del usuario actual
export const getCurrentUserId = async () => await auth.currentUser?.uid;

// Función de logout
export const logout = async () => await signOut(auth);


export const checkUserSession = () => {
    listenAuthState((user) => {
        if (user) {
            console.log('Usuario autenticado:', user);
        } else {
            console.log('No hay usuario autenticado');
        }
    });
};
