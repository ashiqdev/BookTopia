import axios from 'axios';

export const createOrUpdateUser = async (authToken) => {
  console.log({ authToken });
  return axios.post(
    'https://book-shopp.herokuapp.com/api/create-or-update-user',
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

export const currentUser = async (authToken) => {
  return axios.post(
    'https://book-shopp.herokuapp.com/api/current-user',
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
