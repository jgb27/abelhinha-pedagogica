import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

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
    formData.append('image', product.imagem_url);

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
    throw error.response.data;
  }
};

export const FindProduct = async ({ name, term }) => {
  try {
    const response = await axios.get(`${apiUrl}/product/${term}/${name}`)
    return response.data;
  } catch (error) {
    const { message } = error.response.data
    console.error("Error find product:", message);
    throw `Error ${error.response.status}: ${message} `;
  }
}
