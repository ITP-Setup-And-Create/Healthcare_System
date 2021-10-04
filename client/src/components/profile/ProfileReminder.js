import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileReminder = ({ reminder: { reminder, current, to, from } }) => 
        <div>
            <h3 className="text-dark">{reminder}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' 
                : 
                <Moment format='YYYY/MM/DD'>
                    {to}
                </Moment>}
            </p>
        </div>


ProfileReminder.propTypes = {
    reminder: PropTypes.array.isRequired
}

export default ProfileReminder;
