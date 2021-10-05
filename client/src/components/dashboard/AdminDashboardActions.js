import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/addMedicine" className="btn btn-light">
                {/* <i className="fas fa-user-circle text-primary"></i> */} Add Medicine
            </Link>

            <Link to="/viewMedicines" className="btn btn-light">
                {/* <i className="fab fa-black-tie text-primary"></i> */} View Medicines
            </Link>
        </div>
    )
}

export default DashboardActions
