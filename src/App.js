import './App.css';
import { HomePage } from './containers/HomePage';
import { ProductListPage } from './containers/ProductListPage';
import { CartPage }  from './containers/CartPage';
import { CheckoutPage } from './containers/CheckoutPage';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggedIn, updateCart } from './actions';
import { ProductDetailsPage } from './containers/ProductDetailsPage';
import { OrderPage } from './containers/OrderPage'; 
import history from './utils/history'
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  useEffect(()=>{
    console.log('App.js -updateCart');
    dispatch(updateCart());
  },[auth.authenticate]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage}/>
          <Route path="/account/orders" component={OrderPage } />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
