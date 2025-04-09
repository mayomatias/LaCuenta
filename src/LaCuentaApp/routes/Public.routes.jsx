import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/LoginPage';


export const PublicRoute = () => (

  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path='*' element={<Navigate to='/' />} />
  </Routes>

)