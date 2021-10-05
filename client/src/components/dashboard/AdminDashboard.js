import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ auth: { admin, loading } }) => { 

    return loading ? (
    <Spinner /> 
    ) : (   
    <Fragment>
        <h1 className="large text-primary">MyQare</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome to MyQare { admin && admin.name }
        </p>
        <Fragment>
            <DashboardActions />
        </Fragment> 
    </Fragment>
    );
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});



export default connect(mapStateToProps, { })(Dashboard);
