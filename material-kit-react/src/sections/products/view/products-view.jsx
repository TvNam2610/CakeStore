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
import AddEditProductModal from './productModal'; // Import the modal component
import AddFlavorsModal from './AddFlavorsModal'; // Import the AddFlavorsModal component

import { emptyRows, applyFilter, getComparator } from '../utils';
import { createProduct, updateProduct, deleteProduct, addFlavorsToProduct } from '../productService';

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isFlavorsModalOpen, setIsFlavorsModalOpen] = useState(false);
  const [productIdForFlavors, setProductIdForFlavors] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/product/?limit=100');
      if (response.data.err === 0 && Array.isArray(response.data.data.rows)) {
        const productsWithFlavors = await Promise.all(response.data.data.rows.map(async (product) => {
          const flavorsResponse = await axios.get(`http://localhost:5000/api/v1/flavor/${product.id}`);
          const categoryResponse = await axios.get(`http://localhost:5000/api/v1/category/${product.category_id}`);
          const category = categoryResponse.data.data.name;
          const flavors = flavorsResponse.data.data.map(flavor => flavor['Flavor.name']).join(', ');
          return {
            ...product,
            flavors,
            category
          };
        }));
        setProducts(productsWithFlavors);
      } else {
        console.error('Unexpected response structure:', response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/category/');
      if (response.data.code === 0 && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        console.error('Unexpected response structure:', response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    }
  };

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

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const dataFiltered = applyFilter({
    inputData: products,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleOpenModal = (product = null) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleFormSubmit = async (formData) => {
    if (currentProduct) {
      try {
        const updatedProduct = await updateProduct(currentProduct.id, formData);
        setProducts(products.map((product) =>
          product.id === currentProduct.id ? updatedProduct : product
        ));
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    } else {
      try {
        const newProduct = await createProduct(formData);
        await fetchProducts();
      } catch (error) {
        console.error('Failed to create product:', error);
      }
    }
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleAddFlavors = (productId) => {
    setProductIdForFlavors(productId);
    setIsFlavorsModalOpen(true);
  };

  const handleAddFlavorsSubmit = async (productId, flavorIds) => {
    try {
      await addFlavorsToProduct(productId, flavorIds);
      setIsFlavorsModalOpen(false);
      setProductIdForFlavors(null);
    } catch (error) {
      console.error('Failed to add flavors:', error);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>
        <div>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleOpenModal()}>
            New Product
          </Button>
        </div>
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
                  { id: 'price', label: 'Price' },
                  { id: 'quantity', label: 'Quantity' },
                  { id: 'image', label: 'Image' },
                  { id: 'description', label: 'Description' },
                  { id: 'rating', label: 'Rating' },
                  { id: 'totalSales', label: 'TotalSales' },
                  { id: 'flavors', label: 'Flavors' },
                  { id: 'category', label: 'Category' },
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
                      price={row.price}
                      quantity={row.quantity}
                      image={row.image}
                      description={row.description}
                      rating={row.rating}
                      totalSales={row.totalSales || 0}
                      flavors={row.flavors}
                      category={row.category}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onEdit={() => handleOpenModal(row)}
                      onDelete={() => handleDeleteProduct(row.id)}
                      onAddFlavors={() => handleAddFlavors(row.id)}
                    />
                  ))}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, products.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

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

      <AddEditProductModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
        product={currentProduct}
        categories={categories}
      />

      <AddFlavorsModal
        open={isFlavorsModalOpen}
        handleClose={() => setIsFlavorsModalOpen(false)}
        productId={productIdForFlavors}
        handleAddFlavors={handleAddFlavorsSubmit}
      />
    </Container>
  );
}
