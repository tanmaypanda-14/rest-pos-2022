import {Button} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';

function Item({item}) {
  const dispatch = useDispatch();
  function addTocart(){
    dispatch({type:'addToCart',payload: {...item, quantity: 1}})
  }

  return (
    <div>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt={item.name} height='100' width='100'/>
      <h5 className='price'><b>Price : </b>₹{item.price}</h5>
      <div className='d-flex justify-content-end'>
        <Button onClick={()=>addTocart()}>Add to Cart</Button>
      </div>
    </div>
  )
}

export default Item