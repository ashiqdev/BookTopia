import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useContext } from 'react';
import { store } from '../../store/store';
import { auth } from '../../utils/firebase.config';
import { MenuItem } from '@material-ui/core';
import { red, blueGrey, grey } from '@material-ui/core/colors';
import { BookOutlined } from '@material-ui/icons';
import { logOutAction } from '../../store/action/actions';
import ButtonAppBarCollapse from '../ButtonAppBarCollapse/ButtonAppBarCollapse';
// import ButtonAppBarCollapse from '../../components/ButtonAppBarCollpase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  avatar: {
    backgroundColor: red[500],
    marginRight: '1rem',
  },

  buttonBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },

    background: 'transparent',
  },

  bar: {
    backgroundColor: grey[100],
  },
}));

const Header = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogOut = () => {
    console.log('hello');
    auth.signOut();
    dispatch(logOutAction());
  };

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  return (
    <AppBar className={classes.bar} elevation={0}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          aria-label='menu'
        >
          <BookOutlined />
        </IconButton>

        <Typography variant='h6' className={classes.title}>
          <Button
            onClick={() => history.push('/')}
            style={{ color: blueGrey[800] }}
            variant='text'
          >
            Book Shop
          </Button>
        </Typography>

        {/* <ButtonAppBarCollapse>
          {user?.name ? (
            <div>
              <MenuItem>Order</MenuItem>
              <MenuItem onClick={() => history.push('/admin')}>Admin</MenuItem>
              <MenuItem>{user.name}</MenuItem>
              <MenuItem onClick={handleLogOut()}> Log Out</MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={() => history.push('/orders')}>
                Orders
              </MenuItem>
              <MenuItem onClick={() => history.push('/admin')}>Admin</MenuItem>
              <MenuItem onClick={() => history.push('/login')}>Login</MenuItem>
            </div>
          )}
        </ButtonAppBarCollapse> */}

        <div className={classes.buttonBar}>
          <Button style={{ color: blueGrey[800] }} variant='text'>
            Orders
          </Button>

          <Button
            style={{ color: blueGrey[800] }}
            variant='text'
            onClick={() => history.push('/admin')}
          >
            Admin
          </Button>

          {user?.name ? (
            <>
              <Button style={{ color: blueGrey[800] }} variant='text'>
                {user.name}
              </Button>

              <Button onClick={handleLogOut} style={{ color: blueGrey[800] }}>
                Log Out
              </Button>
            </>
          ) : (
            <Button
              onClick={() => history.push('/login')}
              style={{ color: blueGrey[800] }}
              variant='text'
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
