import { makeStyles, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import MainContainer from '../../components/MainContainer/MainContainer';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { createOrUpdateUser } from '../../functions/auth';
import { loggedInUserAction } from '../../store/action/actions';
import { store } from '../../store/store';
import { auth, googleAuthProvider } from '../../utils/firebase.config';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  google: {
    backgroundColor: '#DB4437',
    color: '#fff',
  },
}));

const Login = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  let { from } = location.state || { from: { pathname: '/' } };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await auth.signInWithPopup(googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log({ ges: idTokenResult.token });
      const res = await createOrUpdateUser(idTokenResult.token);
      dispatch(loggedInUserAction(res.data, idTokenResult.token));
      history.replace(from);
      toast.dark(` ${res.data.name} is signed in our system`);
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error(`${error.email} is already taken`);
      }
    }
  };

  useEffect(() => {
    console.log({ user });
    if (user?.name) {
      history.replace(from);
    }
  }, [user]);

  return (
    <MainContainer>
      <div className={classes.center}>
        <PrimaryButton onClick={handleGoogleSignIn} className={classes.google}>
          {loading ? 'Logging With Google...' : 'login with google'}
        </PrimaryButton>
      </div>
    </MainContainer>
  );
};

export default Login;
