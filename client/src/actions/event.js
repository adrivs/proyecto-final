import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
    GET_EVENTS,
    EVENT_ERROR,
    UPDATE_USERS_ATTENDING,
    ADD_EVENT,
    DELETE_EVENT
} from '../actions/types';

// Get all events
export const getEvents = () => async dispatch => {
    try {
        const res = await axios.get('/events');
        dispatch({
            type: GET_EVENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {
                status: err.response.status
            }
        });
    }
};

// Join an event
export const joinEvent = id => async dispatch => {
    try {
        const res = await axios.put(`/events/join/${id}`);
        dispatch({
            type: UPDATE_USERS_ATTENDING,
            payload: { id, usersAttending: res.data }
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Take off from an event
export const takeOffEvent = id => async dispatch => {
    try {
        const res = await axios.put(`/events/takeoff/${id}`);
        dispatch({
            type: UPDATE_USERS_ATTENDING,
            payload: { id, usersAttending: res.data }
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Delete event
export const deleteEvent = id => async dispatch => {
    try {
        await axios.delete(`/events/${id}`);
        dispatch({
            type: DELETE_EVENT,
            payload: id
        });

        dispatch(setAlert('Event deleted', 'success'));
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// Add event
export const addEvent = formData => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };
    try {
        const res = await axios.post(`/events/`, formData, config);
        dispatch({
            type: ADD_EVENT,
            payload: res.data
        });
        dispatch(setAlert('Event created', 'success'));

        const _res = await axios.get('/events');
        dispatch({
            type: GET_EVENTS,
            payload: _res.data
        });
    } catch (err) {
        dispatch({
            type: EVENT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};
