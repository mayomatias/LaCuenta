import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import UserProvider, { useUserContext } from '../provider/UserProviderRegisterLogin';
import { PublicRoute } from './Public.routes';
import { PrivateRoute } from './Private.routes';


const Router = () => {
  
  const {user} = useUserContext()  
  
  return(
    <BrowserRouter>

    {user ? <PrivateRoute /> : <PublicRoute/>}

    </BrowserRouter>
  )
};

export default Router;