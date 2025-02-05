import React from 'react';
import { useForm } from 'react-hook-form';
import './CreateEvent.css';

function CreateEvent() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Add your event creation logic here
    };

    return (
        <>
            <div className="create-event">
                <h2>Create a New Event</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Event Name :</label>
                        <input type="text" {...register('eventName', { required: {value: true, message: "*Event Name is required"}})} />
                        {errors.eventName && <span>{errors.eventName.message}</span>}
                    </div>

                    <div>
                        <label>Date :</label>
                        <input type="date" {...register('date', { required: {value: true, message: "*Date is required"}})} />
                        {errors.date && <span>{errors.date.message}</span>}
                    </div>

                    <div>
                        <label>Start Time :</label>
                        <input type="time" {...register('time', { required: {value: true, message: "*Start Time is required"} })} />
                        {errors.time && <span>{errors.time.message}</span>}
                    </div>

                    <div>
                        <label>Venue :</label>
                        <input type="text" {...register('venue', { required: {value: true, message: "*Venue is required"} })} />
                        {errors.venue && <span>{errors.venue.message}</span>}
                    </div>

                    <div>
                        <label>Description :</label>
                        <textarea {...register('description', { required: {value: true, message: "*Description  is required"}})} />
                        {errors.description && <span>{errors.description.message}</span>}
                    </div>

                    <div>
                        <label>Event Image:</label>
                        <input type="file" {...register('image')} />
                    </div>

                    <button type="submit">Create Event</button>
                </form>
            </div>
        </>
    );
}

export default CreateEvent;
