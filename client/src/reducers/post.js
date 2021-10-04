import { post } from 'request';
import{
    GET_POSTS,
    POST_ERROR,
    DELETE_POST
}from '../actions/types';

const initialState ={
    posts:[],
    post:null,
    loading: true,
    error:{}
}
export default function(state= initialState,action){
    const {type,payload}=action;

    switch(type){
        case GET_POSTS:
        return{
            ...state,
            posts:payload,
            loading:false
        };
        case DELETE_POST:
        return{
            ...state,
            posts: state.posts.filter(post=>post._id !==payload),
            loading:false
        }
        case POST_ERROR:
        return{
            ...state,
           error:payload,
            loading:false
        };
        default:
            return state;
    }
}