import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMedicines } from '../../actions/medicine';
import MedicineItem from './MedicineItem';
import medicine from '../../reducers/medicine';

const Medicines = ({ getMedicines, medicine: { medicines, loading }, auth: { admin } }) => {
    useEffect(() => {
        getMedicines();
    }, [getMedicines]);

    return (
        <Fragment>
            { loading ? <Spinner /> :
                <Fragment>
                <h1 className="large text-primary">Medicines</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> All medicines added into the system. Each can be { admin ? (<Fragment>updated or removed.</Fragment>) : (<Fragment>added to your cart.</Fragment>)}
                </p>
                <div className="profiles">
                    { medicines.length > 0 ? (
                            medicines.filter(medicine => (medicine.countInStock > 0)).map(medicine => (
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
    medicine: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    medicine: state.medicine,
    auth: state.auth
});

export default connect(mapStateToProps, { getMedicines })(Medicines);
