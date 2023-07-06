import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import React from "react";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/loader";
import Message from "../components/message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { id: ProductId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data, isLoading, error } = useGetProductDetailsQuery(ProductId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data.product,qty }));
    navigate('/cart');
  };

  return (
    <>
      <Link to="/" className="btn btn-secondary my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error.err} />
      ) : (
        <Row>
          <Col md={5}>
            <Image
              src={data.product.image}
              alt={data.product.name}
              fluid
            ></Image>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  <b>{data.product.name}</b>
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{data.product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{data.product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {data.product.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {data.product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(data.product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn btn-success"
                    type="button"
                    disabled={data.product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default ProductDetails;
