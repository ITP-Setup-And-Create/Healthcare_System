import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMedicineByName, updateMedicineByID } from '../../actions/medicine';

const EditMedicine = ({ match, getMedicineByName, updateMedicineByID, medicine: { medicine, loading }, history }) => {

    const [formData, setFormData] = useState({ 
        name: '',
        producer: '',
        description: '',
        countInStock: '',
        imageUrl: '',
        form: '',
        type: '',
        ageGroup: '',
        cost: ''
    });

    useEffect(() => {
        getMedicineByName(match.params.id);

        setFormData({
            name: medicine === null ? <Spinner /> : medicine.name,
            producer: loading ? <Spinner /> : medicine?.producer,
            description: loading ? <Spinner /> : medicine?.description,
            countInStock: loading ? <Spinner /> : medicine?.countInStock,
            imageUrl: loading ? <Spinner /> : medicine?.imageUrl,
            form: loading ? <Spinner /> : medicine?.form,
            type: loading ? <Spinner /> : medicine?.type,
            ageGroup: loading ? <Spinner /> : medicine?.ageGroup,
            cost: loading ? <Spinner /> : medicine?.cost
        });
        

    }, [getMedicineByName, match.params.id, loading]);

    const {
        name,
        producer,
        description,
        countInStock,
        imageUrl,
        form,
        type,
        ageGroup,
        cost
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        updateMedicineByID(medicine._id, formData);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Update {name}
            </h1>
            <h2>Producer: {producer}</h2>
            <h2>Form: {form}</h2>
            <h2>Stock Count: {countInStock}</h2>

            <small style={{ color: 'red' }}>All fields are required</small>
            
            <form className="form" onSubmit={e => onSubmit(e)} >

                <div className="form-group">
                    <textarea placeholder="Medicine description" name="description" value={description} onChange={e => onChange(e)} required>
                    </textarea>
                    <small className="form-text">A brief description of this medicine</small>
                </div>

                <div className="form-group">
                    <input type="text" name="type" value={type} onChange={e => onChange(e)} />
                    <small className="form-text">Please use comma separated values </small>
                </div>

                <div className="form-group">
                    <input type="text" name="ageGroup" value={ageGroup} onChange={e => onChange(e)} />
                </div>

                <div className="form-group">
                    <input type="text" name="cost" value={cost} onChange={e => onChange(e)} />
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/viewMedicines">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditMedicine.propTypes = {
    getMedicineByName: PropTypes.func.isRequired,
    updateMedicineByID: PropTypes.func.isRequired,
    medicine: PropTypes.object.isRequired
};

 const mapStateToProps = state => ({
    medicine: state.medicine
}); 

export default connect(mapStateToProps, { updateMedicineByID, getMedicineByName })(EditMedicine);
