import {FETCH_DATA} from './Constants';
import axios from 'axios';

export const fetchData = () => dispatch =>{
    
   axios.get(`https://jsonplaceholder.typicode.com/comments`)
    .then(res=>{
        console.log("response" ,res);
      dispatch({
        type: FETCH_DATA,
        payload: res.data
      });
    })
    .catch(err=>{
      dispatch({
        type: FETCH_DATA,
        payload: err
        
      });
    })

    
  }
  