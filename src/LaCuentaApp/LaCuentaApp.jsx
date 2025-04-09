import React, { useEffect } from 'react'
import UserProvider from './provider/UserProviderRegisterLogin'
import Router from './routes/RegisterLoginApp.routes'
import styled from 'styled-components'
import { checkUserSession } from './services/authWithEmailAndPassword'



export const LaCuentaApp = () => {

  
  return (
    <UserProvider>
      <Router/>
    </UserProvider>
  )
}
