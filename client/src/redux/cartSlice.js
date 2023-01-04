import {createSlice} from '@reduxjs/toolkit'
import {
    ADD_TO_CART,
    CLEAR_CART_ITEM, GET_CART_ITEM,
    REMOVE_CART_ITEM,
    UPDATE_CART_ITEM
  } from "./types";

const cartSlice = createSlice ({
    name:'cart',
    initialState:{
        cartItems: [],
    },
    reducers:{
        // cartReducer(state, action) {
        //     switch (action.type) {
        //         case ADD_TO_CART:
        //           return {
        //             cartItems: action.payload.data,
        //           };
        //         case UPDATE_CART_ITEM:
        //           return {
        //             cartItems: action.payload.data,
        //           };
        //         case REMOVE_CART_ITEM:
        //           return {
        //             cartItems: action.payload.data,
        //           };
        //         case GET_CART_ITEM:
        //           return {
        //             cartItems: action.payload.data,
        //           };
        //         case CLEAR_CART_ITEM:
        //           return {
        //             cartItems: [],
        //           };
        //         default:
        //           return state;
        //       }
        // }

        addToCart(state, action){
            state.cartItems =  action.payload.dat;
        },

        UPDATE_CART_ITEM(state, action){            
            state.cartItems = action.payload.data;
        },

        REMOVE_CART_ITEM(state, action){    
            state.cartItems= action.payload.data;
        },

        getcart(state, action){
            state.cartItems= action.payload.data;
        },
        
        CLEAR_CART_ITEM(state ){             
            state.cartItems= [];
        }
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;