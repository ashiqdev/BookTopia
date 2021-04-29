import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { store } from '../../store/store';
import MainContainer from '../../components/MainContainer/MainContainer';
import { purple } from '@material-ui/core/colors';
import { getProductsAction } from '../../store/action/actions';
import { deleteProductById, getProducts } from '../../functions/product';
import { Button, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 950,

    [theme.breakpoints.down('lg')]: {
      minWidth: 500,
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: 100,
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 100,
    },
  },

  center: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10rem',

    [theme.breakpoints.down('xs')]: {
      postion: 'relative',
      paddingLeft: '0',
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: '5rem',
    },
  },

  tableHead: {
    backgroundColor: purple[400],
  },

  cell: {
    fontWeight: 900,
    color: '#fff',
  },
}));

export default function BasicTable() {
  const classes = useStyles();

  const {
    dispatch,
    state: { products, user },
  } = useContext(store);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts();
      dispatch(getProductsAction(products.data));
    };

    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProductById(user.token, id);
    const products = await getProducts();
    dispatch(getProductsAction(products.data));
    toast.dark('The book is deleted');
  };

  return (
    <div className={classes.center}>
      <MainContainer maxWidth='lg'>
        <Typography
          style={{ marginBottom: '1rem', color: purple[800] }}
          variant='h4'
        >
          All Books
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.cell}>Book Name</TableCell>
                <TableCell className={classes.cell}>Author Name</TableCell>
                <TableCell className={classes.cell}>Price</TableCell>
                <TableCell className={classes.cell}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 &&
                products.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell component='th' scope='row'>
                      {product.name}
                    </TableCell>
                    <TableCell>{product.author}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Button onClick={async () => handleDelete(product._id)}>
                        <DeleteOutlined />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainContainer>
    </div>
  );
}
