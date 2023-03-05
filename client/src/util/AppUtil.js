
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
