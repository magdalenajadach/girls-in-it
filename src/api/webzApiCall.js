import axios from "axios";

const tokenAPI = process.env.NEXT_PUBLIC_WEBZ_API_TOKEN;

export const fetchMediaData = async () => {
  try {
    const tokenAPI = process.env.NEXT_PUBLIC_WEBZ_API_TOKEN; 
    if (!tokenAPI) throw new Error("API token is not defined");
    
    const response = await axios.get(
      `https://api.webz.io/newsApiLite?token=${tokenAPI}&q=woman||q=girl&&q=sport`
    );
    return response.data.posts || []; 
  } catch (error) {
    console.error("Error fetching media data:", error);
    throw error;
  }
};
