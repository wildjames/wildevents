import axios from 'axios';

/* 
 * This function is used to make a GET request to the events API.
 * It returns a boolean value indicating whether the request was successful.
 * 
 * username and password are strings.
 * 
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/api/token/', {
            username,
            password,
        });

        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;

        // Store the token in local storage or context state
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Redirect or change the state upon successful login
        console.log('Logged in successfully:', accessToken);

        return true;
    } catch (err) {
        console.error('Login failed.');
        return false;
    }
};

export const logoutUser = async () => {
    try {
        // Remove access token from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Redirect to login page
        window.location.href = '/login';
    } catch (err) {
        console.error('Logout failed. Please try again.');
    }
}


export const refreshTokenRequest = async () => {
    console.log("Refreshing token");
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        console.log("Got back new access token", newAccessToken);
        return { accessToken: newAccessToken };
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error; // Re-throwing the error to be caught by the interceptor
    }
};
