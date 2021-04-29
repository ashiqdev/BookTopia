import axios from 'axios';

export const createOrder = async (authToken, productId) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/orders`,
    { productId },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getOrders = async (authToken) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
    headers: {
      authToken,
    },
  });
};
