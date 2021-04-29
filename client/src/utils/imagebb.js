import axios from 'axios';

export const uploadImageToServer = async (imageData) => {
  try {
    const {
      data: { data },
    } = await axios.post('https://api.imgbb.com/1/upload', imageData);

    return data.display_url;
  } catch (error) {
    console.log(error);
  }
};
