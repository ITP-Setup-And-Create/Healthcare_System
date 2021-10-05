import axios from 'axios';
import { setAlert } from './alert';

import { GET_MEDICINES, GET_MEDICINE, MEDICINE_ERROR, LOADING_TRUE } from './types';

// Reset the loading variable
export const loadingTrue = () => async dispatch => {
    dispatch({ type: LOADING_TRUE });
}

// Add medicine
export const addMedicine = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/medicine', formData, config);

        dispatch(setAlert('Medicine Added', 'success'));

        history.push('/adminDashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

// Get all medicines
export const getMedicines = () => async dispatch => {
    try {
        const res = await axios.get('/api/medicine');

        dispatch({
            type: GET_MEDICINES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: MEDICINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Clear medicines
export const clearMedicines = () => async dispatch => {
    
};

// Delete Medicine by name
export const deleteMedicine = (name) => async dispatch => {
    try {
        await axios.delete(`/api/medicine/${name}`);

        dispatch(setAlert('Medicine Removed', 'success'));

        const res = await axios.get('/api/medicine');

        dispatch({
            type: GET_MEDICINES,
            payload: res.data
        });  

    } catch (err) {
        dispatch({
            type: MEDICINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status } 
        });
    }
};

// Get medicine by Name
export const getMedicineByName = Name => async dispatch => {
    try {
        const res = await axios.get(`/api/medicine/${Name}`);

        console.log('Function');

        dispatch({
            type: GET_MEDICINE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: MEDICINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Update medicine by ID
export const updateMedicineByID = (ID, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/medicine/${ID}`, formData, config);
        dispatch(setAlert('Medicine Updated', 'success'));

        dispatch({
            type: GET_MEDICINE,
            payload: res.data
        }); 

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: MEDICINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}