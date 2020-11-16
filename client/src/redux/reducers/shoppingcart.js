import { 
    SET_ALERT, 
    REMOVE_ALERT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHECKOUT,
    CLEAR_CART, DECREMENT,
    INCREMENT,
 } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('cart')) || []

// {
//   product_idx: null,
//   quantity: null,
//   image: null,
//   name: null,
//   benefits: null,
//   price: null
// }


// const initialState = {
//   user_idx: null,
//   cart: JSON.parse(localStorage.getItem(cart) || []
// }

export default function(state = initialState, action) {
  const { type, payload } = action;

  let cart 
  switch (type) {
    case ADD_TO_CART:
        cart = localStorage.getItem('cart');
        if (cart === null){
          localStorage.setItem('cart', JSON.stringify([payload]));
          return [...state, payload];
        }else{
          cart = JSON.parse(cart)
          var flag = false;
          cart.forEach((item) => {
            // console.log(`${typeof(item.product_idx)} - ${typeof(payload.product_idx)} `)
            if (item.product_idx === payload.product_idx){
              flag = true
              item.quantity = payload.quantity
            }
          });

          if (flag === false){
            cart.push(payload)
          }
          
          localStorage.setItem('cart', JSON.stringify(cart))
          return [...cart]
        }
    case REMOVE_FROM_CART:
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        cart = cart.filter((item) => item.product_idx !== payload)
        localStorage.setItem('cart', JSON.stringify(cart))
        return state.filter(item => item.product_idx !== payload);
    case INCREMENT:
      
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        // console.log("INCREMENT REDUXXXXXXXX", payload)
        cart.forEach(item => {
          if (item.product_idx === payload.id){
            if(item.quantity === payload.max){
              item.quantity = item.quantity
            }else{
              item.quantity++
            }
          }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        return [...cart]
    case DECREMENT: 
        cart = localStorage.getItem('cart')
        cart = JSON.parse(cart)
        cart.forEach(item => {
          if (item.product_idx === payload.id){
            if(item.quantity === 1){
              item.quantity = item.quantity
            }else{
              item.quantity--
            }
          }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        return [...cart]
    case CLEAR_CART:
        localStorage.removeItem('cart')
        return []
    default:
        return state;
  }
}
