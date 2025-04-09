import React, { useContext, useState } from 'react'
import { Button, Container, Form, Input, Title } from './SignShared.styles'
import { signIn } from '../../../services/authWithEmailAndPassword';
import { useUserContext } from '../../../provider/UserProviderRegisterLogin';
import { useNavigate } from 'react-router-dom';

export const SignIn = ({changePage}) => {


      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const {setUser} = useUserContext()

    const onHandleSubmit = () => {
        signIn(email, password).then((userData) => {          
          setUser(userData)
        }).catch((error) => {
          alert('Invalid Credentials: ' + error)
        })
    }

  return (
        <Container>
          <Form onSubmit={e => e.preventDefault()}>
            <Title>Sign In</Title>
            <Input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={onHandleSubmit}>Sign In</Button>
          </Form>
        </Container>
  )
}
