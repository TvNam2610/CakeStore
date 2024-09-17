import { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { formatPrice } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  id,
  name,
  address,
  email,
  phone,
  orderDate,
  totalAmount,
  paymentMethod,
  selected,
  handleClick,
  onDetail,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover  tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell align="center" padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell align="center">{id}</TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {name}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {email}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {address}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {phone}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {orderDate}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {formatPrice(totalAmount)}
        </TableCell>
        <TableCell component="th" scope="row" padding="none" align="center">
              {paymentMethod}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={onDetail}>
          <Iconify  icon="eva:eye-fill" sx={{ mr: 2, color:'yellow' }} />
          Detail
        </MenuItem>
      </Popover>
    </>
  );
}

ProductTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  onDetail: PropTypes.func.isRequired,
};
