import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { getProductById } from '../../functions/product';
import { store } from '../../store/store';
import MainContainer from '../../components/MainContainer/MainContainer';
import { Button } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import { createOrder } from '../../functions/order';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 950,

    [theme.breakpoints.down('lg')]: {
      minWidth: 500,
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: 320,
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 300,
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
  },

  right: {
    // marginTop: '1rem'
    backgroundColor: purple[700],
    color: 'white',
    '&:hover': {
      backgroundColor: purple[800],
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

export default function ProductDetails() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const history = useHistory();

  const { id } = useParams();

  const {
    state: { user },
  } = useContext(store);

  const handleOrder = async (id) => {
    await createOrder(user.token, id);
    history.push('/orders');
  };

  useEffect(() => {
    const loadProduct = async () => {
      const product = await getProductById(user.token, id);
      console.log(product);
      setRows([
        {
          name: product.data.name,
          quantity: product.data.quantity,
          price: product.data.price,
          id: product.data._id,
        },
      ]);
    };

    loadProduct();
  }, []);

  return (
    <div className={classes.center}>
      <MainContainer maxWidth='lg'>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.cell}>Name</TableCell>
                <TableCell className={classes.cell}>Quantity</TableCell>
                <TableCell className={classes.cell}>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 &&
                rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>${row.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={async () => handleOrder(rows[0].id)}
          fullWidth
          variant='contained'
          className={classes.right}
        >
          Chekout
        </Button>
      </MainContainer>
    </div>
  );
}
