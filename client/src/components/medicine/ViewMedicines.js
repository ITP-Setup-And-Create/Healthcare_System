import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMedicines } from '../../actions/medicine';
import MedicineItem from './MedicineItem';

const Medicines = ({ getMedicines, medicine: { medicines, loading } }) => {
    useEffect(() => {
        getMedicines();
    }, [getMedicines]);

    return (
        <Fragment>
            { loading ? <Spinner /> :
                <Fragment>
                <h1 className="large text-primary">Medicines</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> All medicines added into the system. Each can be updated or removed.
                </p>
                <div className="profiles">
                    { medicines.length > 0 ? (
                            medicines.map(medicine => (
                                <MedicineItem key={medicine._id} medicine={medicine} />
                            ))
                        ) : <h4>No medicines found</h4> 
                    }
                </div>
                </Fragment> 
            }
        </Fragment>
    )
};

Medicines.propTypes = {
    getMedicines: PropTypes.func.isRequired,
    medicine: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    medicine: state.medicine
});

export default connect(mapStateToProps, { getMedicines })(Medicines);
