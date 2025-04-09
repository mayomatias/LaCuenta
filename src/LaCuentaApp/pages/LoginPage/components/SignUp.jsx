/* import React, { useState } from 'react';
import { Container, Title, Input, Button, Form } from  './SignShared.styles';
import { signUp } from '../../../services/authWithEmailAndPassword';

export const SignUp = ({changePage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const onHandleSubmit = () => {
    if (password == checkPassword) {
      signUp(email, password)
    } else {
      alert('Las contraseñas no coinciden')
    }
  }


  return (
    <Container>
      <Form onSubmit={e => e.preventDefault()}>
        <Title>Sign Up</Title>
        <Input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" name="checkPassword" placeholder="Confirm Password" onChange={(e) => setCheckPassword(e.target.value)} />
        <Button onClick={onHandleSubmit}>Sign In</Button>
      </Form>
      <p>Ya estás registrado? </p><a href="#" onClick={() => {changePage(true)}}>Ingresar</a> 

    </Container>
  );
};
 */