import { Divider, makeStyles, Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import MainContainer from '../../components/MainContainer/MainContainer';

import Products from '../Products/Products';

const useStyles = makeStyles((theme) => ({
  center: {
    // marginTop: '1rem',
    color: purple[800],
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('sm')]: {
      marginTop: '20rem',
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '4rem',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <MainContainer>
        <Typography className={classes.center} variant='h4'>
          Books Collection
        </Typography>
      </MainContainer>
      <Divider style={{ marginTop: '3rem' }} variant='fullWidth' />
      <Products />
    </div>
  );
};

export default Home;
