import {useEffect , useState} from 'react';
import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import axios from 'axios';
const HomeScreen = () => {

  const[products, setProducts] = useState([]);

  useEffect(() =>{
    const fetchProduct  = async()=>{
      const {data} = await axios.get('/api/products');
      console.log(data);
      setProducts(data.products);
    }
    fetchProduct();
  },[]);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
