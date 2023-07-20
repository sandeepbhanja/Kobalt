import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/message";
import Loader from "../../components/loader";
import FormContainer from "../../components/formContainer";
import { toast } from "react-toastify";
import {
  useGetUsersByIdQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UpdateUserScreen = () => {

const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { id } = useParams();

  const { data, isLoading, error } = useGetUsersByIdQuery(id);
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setIsAdmin(data.isAdmin);
    }
    else{
    }
  }, [data]);

  const updateHandler = async (e) => {
    e.preventDefault();
    try{
        const updatedUser = {
          _id: id,
          name,
          email,
          isAdmin,
        };
        await updateUser(updatedUser);
        toast.success('User updated successfully');
        navigate('/admin/userlist');
    }
    catch(e){
        toast.error(e?.data?.message || e?.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-dark btn-sm">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader />}
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
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="admin">
              <Form.Label>Admin</Form.Label>
              <Form.Control
                type="boolean"
                placeholder="Make Admin"
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
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

export default UpdateUserScreen;
