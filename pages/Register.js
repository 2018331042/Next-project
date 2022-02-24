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
export default function Register() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { userInfo } = state;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
    console.log({ userInfo });
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert('password didnt match');
      return;
    }
    try {
      const { data } = await axios.post('api/users/register', {
        name,
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
              id="name"
              label="Name"
              value={name}
              inputProps={{ type: 'text' }}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
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
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              inputProps={{ type: 'password' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`Login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
