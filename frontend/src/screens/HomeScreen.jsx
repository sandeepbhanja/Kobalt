import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/loader";
import Message from '../components/message';

const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger' children={error.err}/>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
