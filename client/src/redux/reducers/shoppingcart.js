import { 
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART, DECREMENT,
    INCREMENT, CART_ERROR,
    SAVE_ADDRESS,
    SAVE_ADDRESS_ERROR,
    GET_DETAILS_ERROR,
    GET_DETAILS,
    DETAILS_COMPLETE,
    INVALID_QTY
 } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('cart')) || {
  user: '',
  items: [],
  details_complete: false,
  shippingAddress: {}
}


export default function(state = initialState, action) {
  const { type, payload } = action;

  var cart 
  switch (type) {
    case ADD_TO_CART:
          cart = JSON.parse(localStorage.getItem('cart'));
          
          if (cart === null ){
            var newCart = {}

            //////
            // newCart.items = [payload]
            newCart = {...state, items: [payload]}
            /////

            localStorage.setItem('cart', JSON.stringify(newCart));
            state = newCart
            return state

          }else{
            
            var flag = false;
            cart.items.forEach((item) => {
              if (item.product_idx === payload.product_idx){
                flag = true
                item.quantity = payload.quantity
              }
            });

            if (flag === false){
              cart.items.push(payload)
            }
            
            localStorage.setItem('cart', JSON.stringify(cart))
            state = cart
            return state
        }
     
    case REMOVE_FROM_CART:
        cart = JSON.parse(localStorage.getItem('cart'))
        let newItems = cart.items.filter((item) => item.product_idx !== payload)
        cart.items = newItems

        localStorage.setItem('cart', JSON.stringify(cart))
        return {...state, items: state.items.filter((item) => item.product_idx !== payload) }
    case INCREMENT:
        cart = JSON.parse(localStorage.getItem('cart'))
        cart.items.forEach(item => {
          if (item.product_idx === payload.id){
            if(item.quantity === payload.max){
              item.quantity = item.quantity
            }else{
              item.quantity++
            }
          }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        state = cart
        return state
    case DECREMENT: 
        cart = JSON.parse(localStorage.getItem('cart'))
        cart.items.forEach(item => {
          if (item.product_idx === payload.id){
            if(item.quantity === 1){
              item.quantity = item.quantity
            }else{
              item.quantity--
            }
          }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        state = cart
        return state
    case CLEAR_CART:
        localStorage.removeItem('cart')
        return initialState
    case CART_ERROR: 
        localStorage.removeItem('cart')
        return initialState
    case INVALID_QTY: 
        return state
    case SAVE_ADDRESS:
        let mCart = JSON.parse(localStorage.getItem("cart"))

        if (mCart !== null){
            const { firstname, lastname, phonenumber, email } = payload  

            let add = {}
            add.firstname = firstname ? firstname : mCart.shippingAddress.firstname
            add.lastname = lastname ? lastname : mCart.shippingAddress.lastname
            // add.address = address ? address : mCart.shippingAddress.address
            // add.city = city ? city : mCart.shippingAddress.city
            // add.eirCode = eirCode ? eirCode : mCart.shippingAddress.eirCode
            add.phonenumber = phonenumber ? phonenumber : mCart.shippingAddress.phonenumber
            add.email = email ? email : mCart.shippingAddress.email
            mCart = {...state, shippingAddress: add}

            localStorage.setItem("cart", JSON.stringify(mCart))
            return {...state, shippingAddress: add }
        }

    case DETAILS_COMPLETE:
      return {
        ...state,
        details_complete: payload,
      }
    case SAVE_ADDRESS_ERROR:
      localStorage.setItem("cart", JSON.stringify({ ...state, shippingAddress: {} }))
      return {...state, shippingAddress: {}}
    case GET_DETAILS:
      localStorage.setItem("cart", JSON.stringify({ ...state, shippingAddress: payload }))
      return { ...state, shippingAddress: payload} 
    case GET_DETAILS_ERROR:
      localStorage.setItem("cart", JSON.stringify({ ...state, shippingAddress: {} }))
      return {...state, shippingAddress: {}}
    default:
        return state;
  }
}
