import Axios from "axios";

// Create an instance of Axios
const api = Axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Your API base URL
    withCredentials: true, // This is needed to send cookies with requests
});

// Function to set the Authorization token in headers
const setAuthToken = (token) => {
    if (token) {
        // Set the Authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Remove the Authorization header if no token is provided
        delete api.defaults.headers.common['Authorization'];
    }
};

// Export the Axios instance and the function to set the token
export { api, setAuthToken };
