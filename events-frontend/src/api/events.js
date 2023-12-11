import axios from 'axios';


export const fetchEvents = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/events/');
        console.log('Events fetched successfully:', response.data);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch events', err);
        throw err;
    }
}


export const createEvent = async (eventData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/events/', eventData);

        console.log('Event created successfully:', response.data);
        return response.data;
    } catch (err) {
        console.error('Failed to create event', err);
        throw err;
    }
};