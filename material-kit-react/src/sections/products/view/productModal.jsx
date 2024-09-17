import React, { useState, useEffect } from 'react';
import {
  Modal, Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddEditProductModal = ({ open, handleClose, handleSubmit, product, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    quantity: 0,
    rating: 0,
    totalSales: 0,
    image: '',
    description: '',
    category_id: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || 0,
        quantity: product.quantity || 0,
        rating: product.rating || 0,
        totalSales: product.totalSales || 0,
        image: product.image || '',
        description: product.description || '',
        category_id: product.category_id || '',
      });
    }
  }, [product]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Total Sales"
            name="totalSales"
            type="number"
            value={formData.totalSales}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            sx={{ resize: 'both', overflow: 'auto' }}
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

AddEditProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalSales: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category_id: PropTypes.string, // Thêm category vào PropTypes
  }),
  categories: PropTypes.array.isRequired,
};

AddEditProductModal.defaultProps = {
  product: null,
};

export default AddEditProductModal;
