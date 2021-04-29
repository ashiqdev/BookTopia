import axios from 'axios';

export const createProduct = async (authToken, product) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/products`,
    { product },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getProducts = async () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/products`);
};

export const getProductById = async (authToken, id) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/product/${id}`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const deleteProductById = async (authToken, id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/product/${id}`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
