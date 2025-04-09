import styled from 'styled-components';
import { desktop, landingMobile, mobile } from '../../ExpensePage.styles';


export const SelectCurrent = styled.div`
  height: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 15px;
`


export const ExpenseListContainer = styled.div`
  
  margin: 0;
  padding: 10px;
  border-radius: 5px; 
  margin-bottom: 5px;
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
  >div {
    display: flex;
    flex-direction: column;
  }

  ${mobile} {
    background-color: blue;
  }
  ${landingMobile} {
    background-color: green;
  }
  ${desktop} {
    background-color: gray;
  }
`

export const ExpensesNavigation = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  padding: 5px 20px;
  font-size: 0.8rem;
  background-color: #fff;
  border-radius:  8px 8px 0px 0px;
  background-color: teal;
  overflow: hidden;
  letter-spacing: 1px;
  display: flex;
  justify-content: space-between;
  button {
    background-color: #fff;
    height: 25px;
    width: 25px;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  user-select: none;
  margin-bottom: 65px;

  th, td {
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    border: 1px solid rgb(160 160 160);
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
    text-transform: uppercase;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    color: #333;
  }
`

export const TableContainer = styled.div`
  
  width: 100%;
  font-size: 0.8rem;
  background-color: #fff;
  border-radius:  0px 0px 8px 8px;
  overflow: hidden;
  //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;

`;
