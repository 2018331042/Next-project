import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#753a88',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  login: {
    color: '#FFFFFF',
  },
  title: {
    marginLeft: 10,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

export default useStyles;
