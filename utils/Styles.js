import { makeStyles } from '@material-ui/core';
const useSyles = makeStyles({
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
});

export default useSyles;
