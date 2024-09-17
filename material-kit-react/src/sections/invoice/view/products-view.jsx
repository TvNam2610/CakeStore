import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, Stack, Table, Button, Container, TableBody, Typography, TableContainer, TablePagination, IconButton,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import ProductTableRow from '../product-table-row';
import UserTableHead from '../product-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../product-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import OrderDetailModal from './detail';

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);

  // fetch api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/order/');
        if (response.data.code === 0 && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error('Unexpected response structure:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenModal = async (id) => {
    try {
      const orderResponse = await axios.get(`http://localhost:5000/api/v1/order/${id}`);
      if (orderResponse.data.code === 0 && orderResponse.data.data) {
        const response = await axios.get(`http://localhost:5000/api/v1/order/order-item/${id}`);
        if (response.data.code === 0 && Array.isArray(response.data.data)) {
          setOpenDetailModal(true);
          setOrderDetails(response.data.data); 
          setOrderInfo(orderResponse.data.data);

        } else {
          console.error('Unexpected response structure:', response.data);
      }
    } }catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const dataFiltered = applyFilter({
    inputData: products,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">invoices</Typography>

        
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'name', label: 'Name' },
                  { id: 'address', label: 'Address' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'orderDate', label: 'OrderDate' },
                  { id: 'totalAmount', label: 'TotalAmount' },
                  { id: 'paymentMethod', label: 'PaymentMethod' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ProductTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      address= {row.address}
                      email= {row.email}
                      phone= {row.phone}
                      orderDate= {row.orderDate}
                      totalAmount= {row.totalAmount}
                      paymentMethod= {row.paymentMethod}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onDetail={() => handleOpenModal(row.id)}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, products.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <OrderDetailModal
          open={openDetailModal}
          handleClose={() => setOpenDetailModal(false)} 
          orderDetails={orderDetails}
          orderInfo={orderInfo}
        />
        <TablePagination
          page={page}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      
    </Container>
  );
}
