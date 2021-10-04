import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    user: { _id, name },
    status,
    details
} }) => {
    return (
        <div className='profile bg-light'>
            {/* <img src="" alt="" className="round-img" /> */}
            <div>
                <h2>{name}</h2>
                <p>{status}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                { details.slice(0, 4).map((detail, index) => (
                    <li key={index} className='text-primary'>
                        <i className="fas fa-check"></i> {detail}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
