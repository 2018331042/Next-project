import React, { Children } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useStyles from '../utils/Styles';

export default function Layout({ children }) {
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
          <Button>cart</Button>
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
