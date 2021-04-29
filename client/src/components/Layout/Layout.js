import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import {
  AccountCircle,
  AddCircleOutline,
  BookmarkBorderOutlined,
  BookOutlined,
  MeetingRoom,
  PersonOutlined,
  SettingsOutlined,
  SubjectOutlined,
} from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useContext, useState } from 'react';
import { store } from '../../store/store';
import { auth } from '../../utils/firebase.config';
import { logOutAction } from '../../store/action/actions';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {  purple } from '@material-ui/core/colors';
import { toast } from 'react-toastify';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1rem',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },

  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    paddingTop: '2rem',
    width: drawerWidth,
    background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
    color: '#fff',
  },

  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    marginTop: '4rem',
    width: drawerWidth,
  },

  active: {
    background: purple[400],
  },
}));

const Layout = ({ children }) => {
  const {
    dispatch,
    state: { user },
  } = useContext(store);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      text: 'Booktopia',
      icon: <BookOutlined />,
      path: '/',
    },

    {
      text: 'Orders',
      icon: <BookmarkBorderOutlined />,
      path: '/orders',
    },

    {
      text: 'Login',
      icon: <SubjectOutlined />,
      path: '/login',
    },
  ];

  const signedInItems = [
    {
      text: 'Booktopia',
      icon: <BookOutlined />,
      path: '/',
    },

    {
      text: 'Orders',
      icon: <BookmarkBorderOutlined />,
      path: '/orders',
    },
  ];

  const handleLogOut = () => {
    console.log('hello');
    auth.signOut();
    dispatch(logOutAction());
    toast.dark(` ${user.name} is signed out from our system`);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const drawerProps = {
    anchor: isSmallScreen ? 'top' : 'left',
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        {...drawerProps}
        classes={{ paper: classes.drawerPaper }}
        variant='permanent'
      >
        <List>
          {user?.name ? (
            <div>
              {' '}
              {signedInItems.map((item) => (
                <>
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={
                      location.pathname === item.path ? classes.active : null
                    }
                  >
                    <ListItemIcon style={{ color: '#fff' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </>
              ))}
              <ListItem button onClick={handleClick}>
                <ListItemIcon style={{ color: '#fff' }}>
                  <PersonOutlined />
                </ListItemIcon>
                <ListItemText primary='Admin' />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItem
                    button
                    className={`${classes.nested} ${
                      location.pathname === '/products' ? classes.active : null
                    }`}
                    onClick={() => history.push('/products')}
                  >
                    <ListItemIcon style={{ color: '#fff' }}>
                      <SettingsOutlined />
                    </ListItemIcon>
                    <ListItemText primary='Manage Books' />
                  </ListItem>

                  <ListItem
                    button
                    className={`${classes.nested} ${
                      location.pathname === '/create' ? classes.active : null
                    }`}
                    onClick={() => history.push('/create')}
                  >
                    <ListItemIcon style={{ color: '#fff' }}>
                      <AddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary='Create Book' />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem>
                <ListItemIcon style={{ color: '#fff' }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
              <ListItem button onClick={handleLogOut}>
                <ListItemIcon style={{ color: '#fff' }}>
                  <MeetingRoom />
                </ListItemIcon>
                <ListItemText primary='Sign Out' />
              </ListItem>
            </div>
          ) : (
            <div>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => history.push(item.path)}
                  className={
                    location.pathname === item.path ? classes.active : null
                  }
                >
                  <ListItemIcon style={{ color: '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </div>
          )}
        </List>
      </Drawer>

      {/* content */}
      <div>
        {/* <Box m={8} /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
