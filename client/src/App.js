import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { currentUser } from './functions/auth';
import Books from './Pages/AllProducts/AllProducts';
import CheckOut from './Pages/CheckOut/CheckOut';
import Create from './Pages/Create/Create';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { loggedInUserAction } from './store/action/actions';
import { store } from './store/store';
import { auth } from './utils/firebase.config';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import AllProducts from './Pages/AllProducts/AllProducts';
import Orders from './components/Orders/Orders';
function App() {
  const { dispatch } = useContext(store);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const res = await currentUser(idTokenResult.token);
          console.log({ test: res.data });
          dispatch(loggedInUserAction(res.data, idTokenResult.token));
        }
      } catch (error) {
        console.log(error);
      }
    });

    // clean up
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <Router>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Layout>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/login'>
            <Login />
          </Route>

          <PrivateRoute exact path='/checkout/:id'>
            <CheckOut />
          </PrivateRoute>

          <PrivateRoute exact path='/admin'>
            {/* <Admin /> */}
            <Books />
          </PrivateRoute>

          <PrivateRoute exact path='/create'>
            <Create />
          </PrivateRoute>

          <PrivateRoute exact path='/products'>
            <AllProducts />
          </PrivateRoute>

          <PrivateRoute exact path='/product/:id'>
            <ProductDetails />
          </PrivateRoute>

          <PrivateRoute exact path='/orders'>
            <Orders />
          </PrivateRoute>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
