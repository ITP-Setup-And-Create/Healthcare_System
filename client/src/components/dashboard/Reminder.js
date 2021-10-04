import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteReminder } from '../../actions/profile';

const Reminder = ({ reminder, deleteReminder }) => {
    const reminders = reminder.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? (' Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteReminder(exp._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my2">Reminder</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Text</th>
                        <th className='hide-sm'>Time Period</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{reminders}</tbody>
            </table>
        </Fragment>
    )
}

Reminder.propTypes = {
    reminder: PropTypes.array.isRequired,
    deleteReminder: PropTypes.func.isRequired
}

export default connect(null, { deleteReminder })(Reminder);
