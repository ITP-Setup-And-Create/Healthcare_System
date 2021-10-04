import axios from "axios";
import { setAlert } from "./alert";

import{
    DELETE_POST,
    GET_POSTS,
    POST_ERROR
}from './types';

//GET POSTS
export const getPosts =()=>async dispatch=>{
    try{
        const res=await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }catch (err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
};

//Delete Post
export const deletePost =id =>async dispatch=>{
    try{
        const res=await axios.delete(`/api/posts/${id}`);
        dispatch({
            type:DELETE_POST,
            payload:id
        });
        dispatch(setAlert('Post Removed','success'));
    }catch (err){
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        });
    }
}