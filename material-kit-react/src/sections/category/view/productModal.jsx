import React, { useState, useEffect } from 'react';
import {
  Modal, Box, TextField, Button, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

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

// eslint-disable-next-line react/prop-types
const AddEditProductModal = ({ open, handleClose, handleSubmit, product }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name || '',
        description: product.description || '',
      });
    } else {
      setFormValues({
        name: '',
        description: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formValues);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={onSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {product ? 'Edit Product' : 'New Product'}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        
      
       
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
        
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button color="inherit" onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {product ? 'Update' : 'Create'}
          </Button>
        </Box>
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
      description: PropTypes.string,
    }),
  };
  
  AddEditProductModal.defaultProps = {
    product: null,
  };
  

export default AddEditProductModal;
