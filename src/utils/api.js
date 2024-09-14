import axios from "axios";

const API_BASE_URL = "http://localhost:8282";

export const fetchData = async (endpoint, setData, setLoading, setError = null) => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        setData(response.data);
    } catch (error) {
        // console.error("Error fetching data:", error);
        if (setError) {
            setError(error);
        }
    } finally {
        setLoading(false);
    }
};
