import DLayout from '../components/DLayout.js';
import React, {useEffect} from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import Item from '../components/Item.js';

import '../styles/items.css'

function Home() {
  const [itemsData, setItemsData] = React.useState([]);
  const getAllItems = () => {
    axios.get('/api/items/get-all-items').then((response) => {
      setItemsData(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };  

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DLayout>
        <Row gutter={20}>{itemsData.map((item) => {
          return <Col xs={24} lg={6} md={6} sm={6}>
            <Item key="{item}" item={item}/>
          </Col>
        })}</Row>
    </DLayout>
  );
}

export default Home