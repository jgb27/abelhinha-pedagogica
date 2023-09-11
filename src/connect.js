import axios from "axios";
import { useAppContext } from "./AppProvider";

const apiUrl = "http://127.0.0.1:2727";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const GetAllProduct = async () => {
  try {
    const response = await axios.get(`${apiUrl}/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const AddProduct = async (product) => {
  try {
    const token = getTokenFromLocalStorage();
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('tags', product.tags);
    formData.append('url', product.url);
    formData.append('description', product.description);
    formData.append('image', product.imagem);

    const response = await axios.post(`${apiUrl}/product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const DeleteProduct = async (productId) => {
  try {
    const token = getTokenFromLocalStorage();

    const headers = {
      Authorization: `${token}`,
    };

    const response = await axios.delete(`${apiUrl}/product/${productId}`, { headers });

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const AccessPage = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      name: user.username,
      password: user.password
    })

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const VerifyToken = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/verify`, token)
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
