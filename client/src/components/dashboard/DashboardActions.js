import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/add-reminder" className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> Add Reminder</Link>
             <a href={"http://localhost:3006/LandingPage"} className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> COVID 19 SYSTEM </a>
        </div>
    )
}

export default DashboardActions
