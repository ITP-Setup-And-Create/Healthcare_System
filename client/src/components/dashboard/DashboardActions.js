import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"
            ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
            <Link to="/add-reminder" className="btn btn-light"
            ><i className="fab fa-black-tie text-primary"></i> Add Reminder</Link>
            <Link to="/viewMedicines" className="btn btn-light">
                {/* <i className="fab fa-black-tie text-primary"></i> */} View Medicines
            </Link>
        </div>
    )
}

export default DashboardActions
