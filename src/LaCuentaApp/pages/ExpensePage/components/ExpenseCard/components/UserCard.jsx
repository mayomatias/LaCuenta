import styled from 'styled-components';



const UserName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  text-align: left;
`;

const Total = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const UserCard = ({ user }) => {
  return (
    <>
      <UserName>{user.user}</UserName>
      <Total>Total: {user.total.toFixed(2)}€</Total>
    </>
  );
};
