// AddFlavorsModal.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const AddFlavorsModal = ({ open, handleClose, productId, handleAddFlavors }) => {
  const [flavors, setFlavors] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState([]);

  useEffect(() => {
    const fetchFlavors = async () => {
      const response = await axios.get('http://localhost:5000/api/v1/flavor/');
      setFlavors(response.data.data);
    };

    fetchFlavors();
  }, []);

  const handleFlavorChange = (flavorId) => {
    setSelectedFlavors((prevSelected) =>
      prevSelected.includes(flavorId)
        ? prevSelected.filter((id) => id !== flavorId)
        : [...prevSelected, flavorId]
    );
  };

  const handleSubmit = () => {
    handleAddFlavors(productId, selectedFlavors);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Flavors</DialogTitle>
      <DialogContent>
        <FormGroup>
          {flavors.map((flavor) => (
            <FormControlLabel
              key={flavor.id}
              control={
                <Checkbox
                  checked={selectedFlavors.includes(flavor.id)}
                  onChange={() => handleFlavorChange(flavor.id)}
                />
              }
              label={flavor.name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFlavorsModal;
