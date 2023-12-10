import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventCreationPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [notifyAt, setNotifyAt] = useState('');
    const [colour, setColour] = useState('');
    const [notificationCustomMessage, setNotificationCustomMessage] = useState('');
    const [error, setError] = useState('');

    // On load, check for access token in local storage
    // If not found, redirect to login page
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            // Redirect to login page
            window.location.href = '/login';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                // Redirect to login page
                window.location.href = '/login';
            }

            const response = await axios.post('http://localhost:8000/api/events/', {
                name,
                description,
                date_time: date,
                duration,
                notify_at: JSON.parse(notifyAt),
                colour,
                notification_custom_message: notificationCustomMessage
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            console.log('Event created successfully:', response.data);
            // Redirect to another page or show success message
        } catch (err) {
            setError('Failed to create event. Please try again.');
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Date and Time:</label>
                    <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Duration (in seconds):</label>
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div>
                    <label>Notify At (JSON format):</label>
                    <input type="text" value={notifyAt} onChange={(e) => setNotifyAt(e.target.value)} />
                </div>
                <div>
                    <label>Colour:</label>
                    <input type="text" value={colour} onChange={(e) => setColour(e.target.value)} />
                </div>
                <div>
                    <label>Custom Notification Message:</label>
                    <textarea value={notificationCustomMessage} onChange={(e) => setNotificationCustomMessage(e.target.value)} />
                </div>
                <button type="submit">Create Event</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default EventCreationPage;
