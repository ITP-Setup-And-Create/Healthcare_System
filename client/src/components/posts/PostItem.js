import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {deletePost} from '../../actions/post';

const PostItem = ({deletePost,auth,post:{_id,text,name,user,likes,comments,date}})=>
        <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            
        
            {!auth.loading && user === auth.user._id &&(
 <button    onClick={e=>deletePost(_id)}  
 type="button"
 class="btn btn-danger"
>
 <i class="fas fa-times"></i>
</button>
            )}
           
          </div>
        </div>
    


PostItem.propTypes = {
    post:PropTypes.object.isRequired,
    auth :PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired

}
const mapStateToProps =state=>({
    auth:state.auth
});
export default connect(mapStateToProps,{deletePost}) (PostItem)
