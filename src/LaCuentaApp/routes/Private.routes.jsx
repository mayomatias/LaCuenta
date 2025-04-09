import { Navigate, Route, Routes } from 'react-router-dom';
import { ExpensePage } from '../pages/ExpensePage/ExpensePage';
import { Layout } from '../layout/Layout';
import PopupProvider from '../provider/AddExpensePopUpProvider';
import { ShoppingListPage } from '../pages/ShoppingListPage/ShoppingListPage';


export const PrivateRoute = () => (

  <PopupProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<ExpensePage />} />
        <Route path='/shopping' element={<ShoppingListPage />}/>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Layout>
  </PopupProvider>

)