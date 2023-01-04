import { cartActions } from './cartSlice';
import axios from "axios";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, CLEAR_CART_ITEM, GET_CART_ITEM, REMOVE_CART_ITEM, UPDATE_CART_ITEM } from "./types";

const useCarts=()=> {
  
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId')
  
    const addToCart = (data) => {
      const result = axios
        .post("/carts/addToCart", data)
        .then((res) => {
        //     localStorage.setItem('cartItems2', JSON.stringify(res.data.data.cartDetails))
            
        //     setTimeout(function(){
        //     const a =  localStorage.getItem('cartItems2')
        //     const b = a.map(i=>i.quantity)
        //     console.log(b)
        //    }, 2000);
            console.log(res.data.data)
            const dat = res.data.data.cartDetails
            dispatch(
                cartActions.addToCart({
                dat
              })
            );
          return res.data;
        })
        .catch((err) => {
            console.log(err.response.data)
          return err.response.data;
        });
      return {
        type: ADD_TO_CART,
        payload: result,
      };
    };
  
    const updateCartItem = (data) => {
      const result = axios
        .put("/carts/updateCartItem", data)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      return {
        type: UPDATE_CART_ITEM,
        payload: result,
      };
    };
  
    const removeCartItem = (itemId) => {
      const result = axios
        .put(`/carts/removeCartItem/${itemId}`, false)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
      return {
        type: REMOVE_CART_ITEM,
        payload: result,
      };
    };
  
    const getCartItems = () => {
      const result = axios
        .get("/carts",  {
            params: {
              userId: userId
            }
          })
        .then((res) => {
            dispatch(
                cartActions.getcart({
                res
              })
            );
          return res.data;
        })
        .catch((err) => {
          return err.response.data;
        });
    };
  
    const clearCart = () => {
      dispatch({
        type: CLEAR_CART_ITEM,
      })
    }
  
    return {
      getCartItems,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart
    };
  }

  export default useCarts;