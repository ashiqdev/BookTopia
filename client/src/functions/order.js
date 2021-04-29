import axios from 'axios';

export const createOrder = async (authToken, productId) => {
  return axios.post(
    'https://book-shopp.herokuapp.com/api/orders',
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getOrders = async (authToken) => {
  return axios.get('https://book-shopp.herokuapp.com/api/orders', {
    headers: {
      authToken,
    },
  });
};
