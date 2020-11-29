import { 
    SET_ALERT, 
    REMOVE_ALERT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHECKOUT,
    CLEAR_CART, DECREMENT,
    INCREMENT, CART_ERROR,
    SAVE_ADDRESS,
    SAVE_ADDRESS_ERROR
 } from '../actions/types';

const initialState = JSON.parse(localStorage.getItem('cart')) || {
  user: '',
  items: [],
  shippingAddress: {}
}


export default function(state = initialState, action) {
  const { type, payload } = action;

  var cart 
  switch (type) {
    case ADD_TO_CART:
        try{

          cart = JSON.parse(localStorage.getItem('cart'));
          
          if (cart === null ){
            var newCart = {}

            //////
            // newCart.items = [payload]
            newCart = {...cart, items: [payload]}
            /////

            localStorage.setItem('cart', JSON.stringify(newCart));
            state = newCart
            return state;
          }else{
            
            var flag = false;
            cart.items.forEach((item) => {
              // console.log(`${typeof(item.product_idx)} - ${typeof(payload.product_idx)} `)
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
      }
      catch(e){
        console.log(e)
      }
    case REMOVE_FROM_CART:
        cart = JSON.parse(localStorage.getItem('cart'))
        console.log(cart)
        let newItems = cart.items.filter((item) => item.product_idx !== payload)
        cart.items = newItems
        console.log(cart)

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
    case SAVE_ADDRESS:
        let mCart = JSON.parse(localStorage.getItem("cart"))

        if (mCart !== null){
            const { fullname, address, city , eirCode, country, email } = payload  
            let add = {}
            add.fullname = fullname ? fullname : address.fullname
            add.address = address ? address : address.address
            add.city = city ? city : address.city
            add.eirCode = eirCode ? eirCode : address.eirCode
            add.country = country ? country : address.country
            add.email = email ? email : address.email
            mCart = {...state, shippingAddress: add}

            console.log(email)

            localStorage.setItem("cart", JSON.stringify(mCart))
            return {...state, shippingAddress: add }
        }
    case SAVE_ADDRESS_ERROR:
      localStorage.setItem("cart", JSON.stringify({...state, shippingAddress: []}))
      return {...state, shippingAddress: {}}

    default:
        return state;
  }
}
