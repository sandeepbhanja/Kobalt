export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state)=>{
  //Calculate Item Price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //Calculate Shipping Price (if above 100 free , else 10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //Calculate Tax Price 15%
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

  //Total Price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.taxPrice) +
      Number(state.shippingPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
}