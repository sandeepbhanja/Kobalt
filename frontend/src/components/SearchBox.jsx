import {Form,Button} from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useNavigate,useParams } from 'react-router-dom';
import { useState } from 'react';

const SearchBox = () => {
    const navigate = useNavigate();
    const {keyword} = useParams();
    const [kw,setKw] = useState(keyword);
    const searchHandler = (e)=>{
        e.preventDefault();
        if(kw.trim()){
            navigate(`/search/${kw}`);
        }
        else{
            navigate(`/`);
        }
    }
  return (
    <div>
      <Form onSubmit={searchHandler} className='rounded mx-2'>
        <Form.Control type='text' name='q' placeholder='Search Products' onChange={(e)=>setKw(e.target.value)}></Form.Control>
      </Form>
    </div>
  )
}

export default SearchBox;
