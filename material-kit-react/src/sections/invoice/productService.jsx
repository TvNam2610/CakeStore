import axios from 'axios';

// URL cơ bản của API
const BASE_URL = 'http://localhost:5000/api/v1/category/';

// Hàm tạo sản phẩm mới
// eslint-disable-next-line consistent-return
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(BASE_URL, productData);
    if (response.data.code === 0) {
      return response.data.data;
    } 
    
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Hàm cập nhật sản phẩm
// eslint-disable-next-line consistent-return
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${productId}`, productData);
    if (response.data.code === 0) {
      return response.data.data;
    } 
    
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Hàm xóa sản phẩm
// eslint-disable-next-line consistent-return
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${productId}`);
    if (response.data.code === 0) {
      return response.data.data;
    } 
    
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
