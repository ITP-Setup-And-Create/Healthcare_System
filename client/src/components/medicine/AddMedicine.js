import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { addMedicine } from '../../actions/medicine';

const AddMedicine = ({ setAlert, addMedicine, history }) => {
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
        if(isNaN(cost)) {
            setAlert('Cost can only be a number', 'danger');
        }
        else if(isNaN(countInStock)) {
            setAlert('Stock can only be a number', 'danger');
        }
        else if(document.getElementsByName('form')[0].value === '0') {
            setAlert('Select a form', 'danger');
        }
        else if(document.getElementsByName('ageGroup')[0].value === '0') {
            setAlert('Select an age group', 'danger');
        }
        else {
            addMedicine(formData, history);
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add A Medicine
            </h1>
            <p className="lead">
                All the fields are required to be filled
            </p>
            <form className="form" onSubmit={e => onSubmit(e)} > 
                <div className="form-group">
                    <input type="text" placeholder="Medicine Name" name="name" value={name} onChange={e => onChange(e)} required/>
                    <small className="form-text">The form won't be registered if a medicine with the same name already exists</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Medicine Producer" name="producer" value={producer} onChange={e => onChange(e)} required/>
                    <small className="form-text">The organization that created this medicine</small>
                </div>

                <div className="form-group">
                    <textarea placeholder="Medicine description" name="description" value={description} onChange={e => onChange(e)} required>
                    </textarea>
                    <small className="form-text">A brief description of this medicine</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Stock count" name="countInStock" value={countInStock} onChange={e => onChange(e)} />
                    <small className="form-text">The stock count</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Add an image URL from the web" name="imageUrl" value={imageUrl} onChange={e => onChange(e)}/>
                    <small className="form-text">A default image will be set if this is empty</small>
                </div>

                <div className="form-group">
                    <select name="form" value={form} onChange={e => onChange(e)}>
                        <option value="0">* Select the form of the medicine</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Liquid">Liquid</option>
                        <option value="Powder">Powder</option>
                        <option value="Capsule">Capsule</option>
                    </select>
                    <small className="form-text">Tablet/Liquid/Powder/Capsule</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Type(s)" name="type" value={type} onChange={e => onChange(e)} />
                    <small className="form-text">Please use comma separated values</small>
                </div>

                <div className="form-group">
                    <select name="ageGroup" value={ageGroup} onChange={e => onChange(e)}>
                        <option value="0">* Select Age Group</option>
                        <option value="11-15">11-15</option>
                        <option value="16-20">16-20</option>
                        <option value="21+">21+</option>
                    </select>
                    <small className="form-text">Age groups that can take this medicine</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Cost" name="cost" value={cost} onChange={e => onChange(e)} />
                    <small className="form-text">The cost for 100/ml/g/oz of this medicine. Form will not register if cost is not a number</small>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/adminDashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddMedicine.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addMedicine: PropTypes.func.isRequired
};

export default connect(null, { setAlert, addMedicine })(withRouter(AddMedicine));
