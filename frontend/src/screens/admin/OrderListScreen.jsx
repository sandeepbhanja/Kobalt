import {LinkContainer} from 'react-router-bootstrap';
import {Table,Button} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import Message from '../../components/message';
import Loader from '../../components/loader';
import {useGetOrdersQuery} from '../../slices/OrderApiSlice';


const OrderListScreen = () => {
  const {data:orders , isLoading, error} = useGetOrdersQuery();
  return (
    <>
    <h1>Orders</h1>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>No Orders</Message>):(
      <Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order)=>(
            <tr>
              <td>{order._id}</td>
              <td>{order.user._id}</td>
              <td>{order.createdAt.substring(0,10)}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid ? (order.paidAt.substring(0,10)):(<FaTimes style={{color:'red'}}/>)}</td>
              <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)):(<FaTimes style={{color:'red'}}/>)}</td>
              <td>
                <LinkContainer to={`/orders/${order._id}`}>
                  <Button className='btn-secondary'>Details</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) }
    </>
  )
}

export default OrderListScreen;