import axios from 'axios';

export const createOrUpdateUser = async (authToken) => {
  console.log({ authToken });
  return axios.post(
    `${process.env.REACT_APP_API_URL}/create-or-update-user`,
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
    `${process.env.REACT_APP_API_URL}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
