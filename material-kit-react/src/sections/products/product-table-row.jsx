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
import Description from './description';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  id,
  name,
  price,
  quantity,
  image,
  description,
  rating,
  totalSales,
  flavors,
  category,
  selected,
  handleClick,
  onEdit,onDelete,onAddFlavors
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

        <TableCell align="center">{formatPrice(price)}</TableCell>

        <TableCell align="center">{quantity}</TableCell>

        <TableCell align="center">
          <img src={image} alt={name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </TableCell>

        <TableCell align="center"><Description text={description} /> </TableCell>

        <TableCell align="center">{rating} </TableCell>

        <TableCell align="center">{totalSales} </TableCell>
        <TableCell align="center">{flavors} </TableCell>
        <TableCell align="center">{category} </TableCell>
      
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
         <MenuItem onClick={onAddFlavors}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Add Flavors
        </MenuItem>
        <MenuItem onClick={onEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProductTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  totalSales: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  flavors: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onAddFlavors: PropTypes.func.isRequired,
};
