import React, { Children, useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useStyles from '../utils/Styles';
import { Store } from '../utils/Store';

export default function Layout({ children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const classes = useStyles();
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
          <Button className={classes.login}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        @ All right reserved by Amazona. Thank you!
      </footer>
    </div>
  );
}
