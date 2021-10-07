import axios from 'axios';
import { setAlert } from './alert';

import { MEDICINE_ERROR } from './types';

export const addMedicineToCart = (formData, name) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/cart/${name}`, formData, config);

        dispatch(setAlert('1 Medicine Added To Cart', 'success'));

    } catch (err) {
        dispatch({
            type: MEDICINE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}