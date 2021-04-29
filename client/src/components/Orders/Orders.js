import React, { useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';
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
import { grey, purple } from '@material-ui/core/colors';
import { getOrders } from '../../functions/order';
import { Typography } from '@material-ui/core';

const override = css`
  display: block;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

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

export default function Orders() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    state: { user },
  } = useContext(store);

  useEffect(() => {
    const loadOrders = async () => {
      const orders = await getOrders(user.token);
      setOrders(orders.data);
      setLoading(false);
    };

    loadOrders();

    console.log(orders);
  }, []);

  return (
    <div className={classes.center}>
      {loading ? (
        <>
          <ScaleLoader
            loading={loading}
            color={purple[700]}
            css={override}
            size={15}
          />
        </>
      ) : (
        <>
          <MainContainer maxWidth='lg'>
            <Typography
              style={{ marginBottom: '1rem', color: purple[800] }}
              variant='h4'
            >
              All Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.cell}>Email</TableCell>
                    <TableCell className={classes.cell}>Product Name</TableCell>
                    <TableCell className={classes.cell}>
                      Product Author
                    </TableCell>
                    <TableCell className={classes.cell}>Price</TableCell>
                    <TableCell className={classes.cell}>Created At</TableCell>

                    {/* <TableCell align='right'>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 &&
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component='th' scope='row'>
                          {order.email}
                        </TableCell>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.product.author}</TableCell>
                        <TableCell>${order.product.price}</TableCell>
                        <TableCell>
                          <Moment>{order.createdAt}</Moment>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainContainer>
        </>
      )}
    </div>
  );
}
