import DLayout from '../components/DLayout.js';
import React, {useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import Item from '../components/Item.js';

import '../styles/items.css'

function Home() {
  const [itemsData, setItemsData] = React.useState([]);
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({type: 'showLoading'});
    axios
    .get('/api/items/get-all-items')
    .then((response) => {
      dispatch({type: 'hideLoading'});
      setItemsData(response.data);
    }).catch((error) => {
      dispatch({type: 'hideLoading'});
      console.log(error);
    });
  };  

  useEffect(() => {
    getAllItems();// eslint-disable-next-line
  }, []);

  return (
    <DLayout>
        <Row gutter={20}>{itemsData.map((item) => {
          console.log(item);
          return <Col xs={24} lg={6} md={6} sm={6}>
            <Item key={item._id} item={item}/>
          </Col>
        })}</Row>
    </DLayout>
  );
}

export default Home