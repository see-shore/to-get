import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { uploadImageAsync } from '../../redux/slices/itemsSlice';

function FileInput() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    dispatch(uploadImageAsync(file));
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default FileInput;
