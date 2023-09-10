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

export const AddProduct = async (product) => {
  try {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('tags', product.tags);
    formData.append('url', product.url);
    formData.append('description', product.description);
    formData.append('image', product.imagem);

    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
