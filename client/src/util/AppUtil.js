

export const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

export const cartExists = () => {
  return localStorage.hasOwnProperty('cart')
    && localStorage.hasOwnProperty('cartUpdatedAt');
};

export const isCartValid = () => {
  // Check that cached cart was updated and stored in the past day
  const cartDate = new Date(localStorage.getItem('cartUpdatedAt'));
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  return (cartDate > yesterdayDate);
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart'));
};

// Produces data URL of a given file.
// Prep for sending image in request.
export const readDataUrl = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    ReadableStream.onload = (e) => { res(e.target.result) };
    reader.onerror = (e) => { rej(e) };
    reader.readAsDataURL(file);
  });
};

const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;

export const resizeImage = (width, height) => {
    var newDimensions = {
        width: width,
        height: height
    }

    if (width > height) {
        if (width > MAX_WIDTH) {
            newDimensions.height *= MAX_WIDTH / width;
            newDimensions.width = MAX_WIDTH;
        }
    } else {
        if (height > MAX_HEIGHT) {
            newDimensions.width *= MAX_HEIGHT / height;
            newDimensions.height = MAX_HEIGHT;
        }
    }

    return newDimensions;
};
