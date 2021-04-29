import { Grid, makeStyles } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';
import MainContainer from '../../components/MainContainer/MainContainer';
import { getProducts } from '../../functions/product';
import { getProductsAction } from '../../store/action/actions';
import { store } from '../../store/store';
import Product from '../Product/Product';
import { purple } from '@material-ui/core/colors';

const override = css`
  display: block;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
`;

const useStyles = makeStyles((theme) => ({
  padding: {
    paddingTop: '5rem',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '25rem',
    },
  },

  space: {},
}));

const Products = () => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const {
    dispatch,
    state: { products },
  } = useContext(store);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts();
      dispatch(getProductsAction(products.data));
      setLoading(false);

    };

    try {
      loadProducts();
      // setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <div className={classes.space}>
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
          <MainContainer maxWidth='xl'>
            <div className={classes.padding}>
              <Grid container className={classes.root} spacing={2}>
                {products.map((product) => (
                  <Grid xs={12} sm={6} lg={4} xl={3} key={product._id} item>
                    <Product key={product._id} {...product} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </MainContainer>
        </>
      )}
    </div>
  );
};

export default Products;
