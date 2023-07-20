import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/message";
import Loader from "../../components/loader";
import FormContainer from "../../components/formContainer";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadImageMutation,
} from "../../slices/productsApiSlice";

const UpdateProductScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { data, isLoading, error, refetch } =
    useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadImage, { isLoading: ImageLoading }] = useUploadImageMutation();

  useEffect(() => {
    if (data) {
      setName(data.product.name);
      setPrice(data.product.price);
      setDescription(data.product.description);
      setBrand(data.product.brand);
      setCountInStock(data.product.countInStock);
      setCategory(data.product.category);
      setImage(data.product.image);
    } else {
      // toast.error("Product not found");
    }
  }, [data]);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      };
      await updateProduct(updatedProduct);
      toast.success("Product updated successfully");
      refetch();
      navigate("/admin/productlist");
    } catch (e) {
      toast.error(e?.data?.message || e?.error);
    }
  };

  const uploadFileHandler = async(e)=>{
    const formData = new FormData();
    formData.append('image',e.target.files[0]);
    try{
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    }
    catch(e){
      toast.error(e?.data?.message || e?.error);
    }
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark btn-sm">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Loading...</Message>
        ) : (
          <Form onSubmit={updateHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="btn btn-dark btn-sm my-2" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UpdateProductScreen;
