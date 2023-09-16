import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const GetAllUsers = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        'Authorization': `${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const GetUser = async () => {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(`${apiUrl}/user`, {
      headers: {
        'Authorization': `${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const GetAllProduct = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const GetProductsByUser = async () => {
  try {
    const token = getTokenFromLocalStorage();

    const response = await axios.get(`${apiUrl}/product`, {
      headers: {
        'Authorization': `${token}`
      }
    })

    return response.data;
  } catch (error) {
    console.log('Error fetching products: ')
  }
}

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
    formData.append('pdf', product.pdf_url);

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

export const DeleteUser = async (userId) => {
  try {
    const token = getTokenFromLocalStorage();

    const headers = {
      Authorization: `${token}`,
    };

    const response = await axios.delete(`${apiUrl}/users/${userId}`, { headers });

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export const AccessPage = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      username: user.username,
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

export const CreateOrder = async ({ productName, productId, productPrice }) => {
  try {
    const token = getTokenFromLocalStorage();

    const headers = {
      Authorization: `${token}`,
    };

    const response = await axios.post(`${apiUrl}/create-order`,
      {
        _id: productId,
        name: productName,
        price: productPrice
      },
      {
        headers
      });

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
