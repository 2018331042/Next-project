import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  Link,
} from '@material-ui/core';
import axios from 'axios';
import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/Styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const [login, isLoggedIn] = useState(false);
  const { userInfo } = state;
  const [email, setEmail] = useState('Bashir23@gmail.com');
  const [password, setPassword] = useState('123456');

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
    console.log({ userInfo });
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      alert('success login');
      router.push(redirect || '/');
    } catch (err) {
      console.log({ err });
      alert(err.response.data ? err.response.data.message : err.message);
    }
  };
  const classes = useStyles();
  return (
    <Layout>
      <form onSubmit={formHandler} className={classes.form}>
        <Typography>Login</Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              value={email}
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              value={password}
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Dont have an account? &nbsp;
            <NextLink href={`Register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
