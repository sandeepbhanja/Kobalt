import { Row, Col } from "react-bootstrap";
import Product from "../components/product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/loader";
import Message from "../components/message";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  const {keyword} = useParams();
  const { data, isLoading, error } = useGetProductsQuery(keyword);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error.err} />
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.map((product) => (
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
