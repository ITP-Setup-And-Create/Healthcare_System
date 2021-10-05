import { GET_MEDICINE, GET_MEDICINES, MEDICINE_ERROR, LOADING_TRUE } from "../actions/types";

const initialState = {
    medicine: null,
    loading: true,
    medicines: [],
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_MEDICINE:
            return {
                ...state,
                medicine: payload,
                loading: false
            }
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case GET_MEDICINES:
            return {
                ...state,
                medicine: null,
                loading: false,
                medicines: payload,
            }
        case MEDICINE_ERROR:
            return {
                ...state,
                error: payload,
            }
        default: 
            return state;
    }
}