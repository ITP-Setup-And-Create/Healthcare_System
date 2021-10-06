import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteMedicine, loadingTrue } from '../../actions/medicine';

const MedicineItem = ({ medicine: { _id, name, producer, form, type, ageGroup, cost }, deleteMedicine, loadingTrue, auth: { admin } }) => {
    return (
        <div className='profile bg-light'>
            <div>
                <h3>{name}</h3>
                <label style={{fontSize: 15}}>Producer: {producer}</label> <br />
                <label style={{fontSize: 15}}>Form: {form}</label> <br />
                <label style={{fontSize: 15}}>Age Group: {ageGroup}</label> <br />
                <label style={{fontSize: 15}}>Rs{cost}</label> <br />
            </div>
            <ul>
                { type.slice(0, 4).map((type, index) => (
                    <li key={index} className='text-primary'>
                        <i className="fas fa-check"></i> {type}
                    </li>
                ))}
            </ul>
            <div>
                { admin ? 
                (
                    <Fragment>
                        <Link to={`/medicine/${name}`} className='btn btn-primary' onClick={() => loadingTrue()}>Update Medicine</Link>
                        <button className='btn btn-danger' style={{width: 161, marginTop: 30}} onClick={() => deleteMedicine(name)}>Delete</button>
                    </Fragment>
                ) : 
                (
                    <Fragment>
                        <button>Add to Cart</button>
                    </Fragment>
                )
                }
            </div>
        </div>
    )
}

MedicineItem.propTypes = {
    medicine: PropTypes.object.isRequired,
    deleteMedicine: PropTypes.func.isRequired,
    loadingTrue:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteMedicine, loadingTrue })(MedicineItem);
