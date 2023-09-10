import axios from "axios";

const apiUrl = "http://127.0.0.1:2727/product";

export const GetAllProduct = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
