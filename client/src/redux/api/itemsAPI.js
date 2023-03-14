import axios from 'axios';

export const getItems = async () => {
  const response = await axios.get('/item/all');
  return response.data;
};

export const updateItem = async (itemData) => {
  const response = await axios.put(`/item?itemId=${itemData.id}`, itemData);
  return response.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post('/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};
