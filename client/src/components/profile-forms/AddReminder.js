import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReminder } from '../../actions/profile';

const AddReminder = ({ addReminder, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        from: '',
        to: '',
        current: false
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, from, to, current } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 class="large text-primary">
                Add A Reminder
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add a reminder that you would need for the future
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit= {e => {
                e.preventDefault();
                addReminder(formData, history);
            }} >
                {/* <div class="form-group">
                    <input type="text" placeholder="* Job Title" name="title" required />
                </div> */}
                <div class="form-group">
                    <input type="text" placeholder="* Type reminder here" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                {/* <div class="form-group">
                    <input type="text" placeholder="Location" name="location" />
                </div> */}
                <div class="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)}/>
                </div>
                <div class="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {setFormData({...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                }} /> </p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled? 'disabled' : ''} />
                </div>
                {/* <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"></textarea>
                </div> */}
                <input type="submit" class="btn btn-primary my-1" />
                <a class="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddReminder.propTypes = {
    addReminder: PropTypes.func.isRequired
}

export default connect(null, { addReminder })(withRouter(AddReminder));
