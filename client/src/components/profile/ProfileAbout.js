import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: { bio, details, user: { name } }}) => {
    return (
        <div class="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 class="text-primary">{name}s current residing address</h2>
                    <p>
                        {bio}
                    </p>
                    <div class="line"></div>
                </Fragment>
            )}
            
          
       
          
          <h2 class="text-primary">Contact Details</h2>
          <div class="details">
            {details.map((detail, index) => (
                <div key={index} className="p-1">
                    <i className="fas fa-check"></i> {detail}
                </div>
                
            ))}
            
          </div>
        </div>
        
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
