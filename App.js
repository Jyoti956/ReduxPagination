import React, {useState, useEffect, memo} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import { fetchData } from './actions/Action';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';



const App = () => {
  const dispatch = useDispatch();
  const [firstValue, setFirstValue] = useState(0);
  const [lastValue, setLastValue] = useState(20);
  const [finalData, setFinalData] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);
  const [rowLimit] = useState(20);
  const [toggle, setToggle] = useState(0);
  
  const [prevDisabled,setPrevDisabled]=useState(true);
  const [nextDisabled,setNextDisabled]=useState(true);
  
  

useEffect(() => {
  dispatch(fetchData())
},[])

const URL="https://jsonplaceholder.typicode.com/posts"

const handleDeleteRow=(id)=>{
  axios.delete(`${URL}/${id}`).then(res => {
    const del = finalData.filter(finalData => id !== finalData.id)
    setFinalData(del)
})
}


const apiData = useSelector(state => state)
const totalData=apiData.firstReducer.Data.length;
console.log("totalData",totalData);
const totalPages=totalData/rowLimit;
console.log("totalPages",totalPages);

  useEffect(() => {
    if(apiData.firstReducer.Data.length > 0){
      setFinalData(apiData.firstReducer.Data.slice(firstValue, lastValue))
      setPageLimit(apiData.firstReducer.Data.length/rowLimit)
      setPrevDisabled(firstValue > 0 && lastValue > rowLimit ? false : true)
      setNextDisabled(firstValue < totalData-20 && lastValue < totalData ? false : true)
      console.log("********")
    }
  },[firstValue, apiData])

  
  console.log("apiData", apiData); 
console.log("finalData", finalData)
return (
  <div className="App">

  <h1>Pagination in Redux</h1>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><h2>ID</h2></TableCell>
          <TableCell align="center"><h2>NAME</h2></TableCell>
          <TableCell align="center"><h2>EMAIL</h2></TableCell>
          <TableCell align="center"><h2>POST-ID</h2></TableCell>
          <TableCell align="center"><h2>Delete/Edit</h2></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {finalData && finalData.map((data)=>{
          return (<TableRow key={data.id}>
        <TableCell>{data.id}</TableCell>
        <TableCell>{data.name}</TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.postId}</TableCell>
        <TableCell><button id="del" onClick={i =>handleDeleteRow(data.id)}>Delete</button>
        </TableCell>
        </TableRow>)})}
      </TableBody>
    </Table>
  </TableContainer>
  <br/>
  
  <button disabled={prevDisabled} onClick={()=>{
    setFirstValue(0)
    setLastValue(rowLimit)
    setPageCount(1)
    console.log(pageCount);
    }}
  >First</button>

  <button disabled={prevDisabled} onClick={()=>{
    console.log(pageCount);
    if(firstValue > 0 && lastValue > rowLimit){
      setFirstValue(firstValue - rowLimit)
      setLastValue(lastValue - rowLimit)
      if(pageCount > 1){
        setPageCount(pageCount - 1)
      }
    }}}>Prev</button>
  
  <button style={{color:'white'}} onClick={()=>{
    setToggle(0)
    console.log(pageCount);
    if(toggle === 1 ){
      setFirstValue(firstValue - rowLimit)
      setLastValue(lastValue - rowLimit)
      }
  }}>{pageCount}</button>
  
  <button style={{color:'white'}} onClick={()=>{
    setToggle(1)
    
    if(toggle === 0){
    setFirstValue(firstValue + rowLimit)
    setLastValue(lastValue + rowLimit)
    }
  }}>{pageCount + 1}</button>
  
  <button disabled={nextDisabled} onClick={()=>{
    if(firstValue < totalData-20 && lastValue < totalData){
      setFirstValue(firstValue + rowLimit)
      setLastValue(lastValue + rowLimit)
      if(pageCount < pageLimit){
        setPageCount(pageCount + 1)
        setNextDisabled(false)
      }
      console.log(pageCount);
    }}}>Next</button>
  
  <button disabled={nextDisabled} onClick={()=>{
    setFirstValue(totalData-20)
    setLastValue(totalData)
    setPageCount(totalPages-1)
    console.log(pageCount);
  }}>Last</button>
</div>
  );
}

export default memo(App);