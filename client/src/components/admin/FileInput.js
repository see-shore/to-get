import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setAttachedFile } from '../../redux/slices/staged/stagedItemsSlice';

function FileInput() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      dispatch(setAttachedFile(event.target.files[0]));
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleChange} />
    </div>
  );
};

export default FileInput;
