import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/event';

const EventForm = ({ addEvent }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        language: ''
    });

    const { title, date, location, language } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();
        addEvent(formData);
        setFormData({
            title: '',
            date: '',
            location: '',
            language: ''
        });
    };
    return (
        <div className='container create-event'>
            <h2>Create an event</h2>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        type='text'
                        value={title}
                        name='title'
                        className='form-control'
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <label>Date</label>
                    <input
                        type='datetime-local'
                        value={date}
                        name='date'
                        className='form-control'
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <label>Location</label>
                    <input
                        type='text'
                        value={location}
                        name='location'
                        className='form-control'
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        Please use this format (Place, City)
                    </small>
                </div>
                <div className='form-group'>
                    <label>Language</label>
                    <input
                        type='text'
                        value={language}
                        name='language'
                        className='form-control'
                        onChange={e => onChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-sm btn-clover'>
                    <span>Create</span>
                </button>
            </form>
        </div>
    );
};

EventForm.propTypes = {
    addEvent: PropTypes.func.isRequired
};

export default connect(
    null,
    { addEvent }
)(EventForm);
