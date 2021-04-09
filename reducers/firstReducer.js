import {FETCH_DATA} from '../actions/Constants';

const initialState={
    Data:[]
}
  export default function firstReducer(state=initialState,action){
    console.log(action);

    switch(action.type){
        case FETCH_DATA:{
            
            return {
                ...state,
                Data: action.payload
            }
    }

    default:
            return {...state,
            }  
    }  
 
    
}