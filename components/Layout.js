import React, { Children, useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useStyles from '../utils/Styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Layout({ children }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const classes = useStyles();
  const logincClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });

    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
  console.log({ userInfo });
  return (
    <div>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography variant="h6">Amazona</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <NextLink href="/Cart" passHref>
            <Link>
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  Cart
                </Badge>
              ) : (
                'Cart'
              )}
            </Link>
          </NextLink>
          {userInfo ? (
            userInfo.isAdmin === true ? (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={logincClickHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
                <Button
                  onClick={() => router.push('/admin/dashBoard')}
                  className={classes.login}
                >
                  DashBoard
                </Button>
              </>
            ) : (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={logincClickHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            )
          ) : (
            <Button
              onClick={() => router.push('/Login')}
              className={classes.login}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        @ All right reserved by Amazona. Thank you!
      </footer>
    </div>
  );
}
