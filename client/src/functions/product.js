import axios from 'axios';

export const createProduct = async (authToken, product) => {
  return axios.post(
    'https://book-shopp.herokuapp.com/api/products',
    { product },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getProducts = async () => {
  return axios.get('https://book-shopp.herokuapp.com/api/products');
};

export const getProductById = async (authToken, id) => {
  return axios.get(
    `https://book-shopp.herokuapp.com/api/product/${id}`,
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
    `https://book-shopp.herokuapp.com/api/product/${id}`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
