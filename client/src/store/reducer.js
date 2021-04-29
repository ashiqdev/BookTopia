import { GET_PRODUCTS, LOGGED_IN_USER, LOG_OUT } from './action/actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        user: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
