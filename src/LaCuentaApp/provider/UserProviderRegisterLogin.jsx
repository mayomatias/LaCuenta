import { createContext, useState, useContext, useEffect } from 'react';
import { listenAuthState } from '../services/firebase';

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children}) => {

  useEffect(() => {
    // Escuchar el estado de autenticación
    listenAuthState(setUser);  // Actualiza el estado cuando cambia el usuario
  }, []);



  const [user, setUser] = useState();
  return (
    <AppContext.Provider value={{user, setUser}}>
      {children}
    </AppContext.Provider>
  );
}

export default UserProvider;