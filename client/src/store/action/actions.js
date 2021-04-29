import { GET_PRODUCTS, LOGGED_IN_USER, LOG_OUT } from './actionTypes';

const loggedInUserAction = (user, token) => {
  return {
    type: LOGGED_IN_USER,
    payload: {
      name: user.name,
      email: user.email,
      token: token,
      _id: user._id,
    },
  };
};

const logOutAction = () => {
  console.log('hi');
  return {
    type: LOG_OUT,
    payload: null,
  };
};

const getProductsAction = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

export { loggedInUserAction, logOutAction, getProductsAction };
