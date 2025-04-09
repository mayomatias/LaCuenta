import React from 'react'
import { usePopupContext } from '../provider/AddExpensePopUpProvider'
import { TbReportMoney } from "react-icons/tb";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LuListTodo } from "react-icons/lu";


const Nav = styled.nav`
  width: 100%;
  height: 55px;
  background-color: teal;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a{
    color: white;
  }
`

const Container = styled.div`
  width: 95%;
  margin: auto;
` 
const iconsWidht = {
  width: '40px',
  height: '35px',
}

export const Layout = ({children}) => {


  return (
    <>
{/*       <h1 style={{fontFamily: 'arial', marginTop: "10px", marginLeft: "10px", fontSize: 20}}>LaCuenta</h1>
 */}      
      <Container>
        {children}
      </Container>
      <Nav>
        <Link to='/'><TbReportMoney style={iconsWidht}/></Link>
        <Link to='/shopping'><LuListTodo style={iconsWidht}/></Link>
      </Nav>
    </>

  )
}
