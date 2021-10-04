import React, { Fragment, useEffect } from 'react';    
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileReminder from './ProfileReminder';
import { getProfileByID, getProfiles } from '../../actions/profile';

const Profile = ({ match, getProfileByID, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileByID(match.params.id);
    }, [getProfileByID, match.params.id]);

    return (
        <Fragment>
            { profile === null || loading ? <Spinner /> : <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to Profiles
                    </Link>
                    { auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>
                        Edit Profile
                    </Link>
                    )}
                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Reminders </h2>
                            {profile.reminder.length > 0 ? ( 
                            <Fragment>
                                {profile.reminder.map(reminder => (
                                    <ProfileReminder key={reminder._id} reminder={reminder} />
                                ))}
                            </Fragment>
                            ) : (
                                <h4>No reminders were set</h4>
                            ) 
                            }
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileByID })(Profile);
