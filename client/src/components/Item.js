import {Button} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';
import '../styles/items.css'

function Item({item}) {
  const dispatch = useDispatch();
  function addTocart(){
    dispatch({type:'addToCart',payload: {...item, quantity: 1}})
  }

  return (
    <div>
      <h4 className='name'>{item.name}</h4>
      <h5 className='price'>Price :₹{item.price}</h5>
      <img src={item.image} alt={item.name} height='100' width='100'/>
      <div className='flex'>
        <Button onClick={()=>addTocart()}>Add to Cart</Button>
      </div>
    </div>
  )
}

export default Item