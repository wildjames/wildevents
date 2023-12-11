import axios from 'axios';
import { refreshTokenRequest } from './accounts';


axios.interceptors.response.use(
    (response) => {
        // Simply return the response
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (error.response) {
            // Token expired
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    // Refresh token API call
                    const data = await refreshTokenRequest(); 
                    console.log("Got back data", data);

                    // Update axios header
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;

                    // Return original request
                    return axios(originalConfig);
                } catch (refreshError) {
                    // Handle refresh token failure, like redirecting to login
                    console.error("Refresh token failed", refreshError);
                    return Promise.reject(refreshError);
                }
            }

            console.log("Error response:", error.response);
            console.log("Original configuration:", originalConfig);

            // // Handle other status codes
            // if (error.response.status === ANOTHER_STATUS_CODE) {
            //     // Custom logic
            // }
        }

        return Promise.reject(error);
    }
);
