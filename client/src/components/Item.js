import {Button} from 'antd';
import { useEffect } from 'react';
import React from 'react';
import {useDispatch} from 'react-redux';
import useCarts from '../redux/cartActions';

function Item({item}) {
  const dispatch = useDispatch();
  const {addToCart} = useCarts();
  const handleAddToCart = (item) => {
  const userId = localStorage.getItem('userId')
    const data = {
      _itemId: item._id,
      userId: userId,
      quantity: 1,
      price: item.price
    };
    dispatch(addToCart(data));
  };
  useEffect(() => {
    // console.log(item._id)
    console.log(item.price)
  }, [])

  return (
    <div>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt={item.name} height='100' width='100'/>
      <h5 className='price'><b>Price : </b>₹{item.price}</h5>
      <div className='d-flex justify-content-end'>
        <Button onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
      </div>
    </div>
  )
}

export default Item