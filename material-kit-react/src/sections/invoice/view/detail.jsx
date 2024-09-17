/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Grid } from '@mui/material';
import { formatPrice } from 'src/utils/format-number';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderDetailModal = ({ open, handleClose, orderDetails, orderInfo }) => (
  <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
    <Box sx={style}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        x
      </IconButton>
      <Typography id="modal-title" variant="h6" component="h2">
        Order Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            {orderDetails.map((detail) => (
              <ListItem key={detail.id}>
                <ListItemAvatar>
                  <Avatar alt={detail.name} src={detail['Product.image']} />
                </ListItemAvatar>
                <ListItemText primary={detail.name} secondary={`Price: ${detail.price}đ, Quantity: ${detail.quantity}`} />
              </ListItem>
            ))}
          </List>
          <Typography  variant='subtitle1'>Total Amount: {orderInfo.totalAmount}đ</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" gutterBottom>
            Deliver To:
          </Typography>
          <Typography variant="body1">
            name :      {orderInfo.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            address :       {orderInfo.address}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            email :       {orderInfo.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            phone :       {orderInfo.phone}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Modal>
);

OrderDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderDetails: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    'Product.image': PropTypes.string,
  })).isRequired,
  orderInfo: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default OrderDetailModal;
