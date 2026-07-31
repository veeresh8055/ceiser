 import api from '../utils/axios.js'

const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/api/me");
    return data;
  } catch (error) {
    // A missing session on first page load simply means the user is logged out.
    if (error.response?.status !== 401) {
      console.error("Unable to get current user:", error);
    }
    return null;
  }
};
export default getCurrentUser ; 
