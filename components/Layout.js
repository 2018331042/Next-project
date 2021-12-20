import React, { Children } from 'react';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import useSyles from '../utils/Styles';

export default function Layout({ children }) {
  const classes = useSyles();
  return (
    <div>
      <Head>Learning Project</Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Amazona
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        All right reserved by Amazona. Thank you!
      </footer>
    </div>
  );
}
