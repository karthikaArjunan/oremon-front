import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartItems,removeCartItem } from '../../actions';
import { Layout } from '../../components/Layout'
import { Card } from '../../components/UI/Card'
import { CartItem } from './CartItem';
import { MaterialButton } from "../../components/MaterialUI";
import { PriceDetails } from "../../components/PriceDetails";

import './style.css'
/**
* @author
* @function CartPage
**/

export const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    if(cart.cartItems.cart)delete cart.cartItems.cart;
    console.log('cartItem',cart.cartItems);
    const dispatch = useDispatch();
    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);
    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);
    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        if(cart.cartItems.cart)delete cart.cartItems.cart;
        //dispatch(addToCart({ _id, name, price, img }, 1));
    }
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        if(cart.cartItems.cart)delete cart.cartItems.cart;
        //dispatch(addToCart({ _id, name, price, img }, -1));
    }
    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
      };
    if (props.onlyCartItems) {
        return (
          <>
            {Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
              />
            ))}
          </>
        );
      }
    return (
        <Layout>
            <div className='cardContainer' style={{ alignItems: 'flex-start' }}>
                <Card
                    headerLeft={'My Cart'}
                    style={{ width: "calc(100% - 50%)", overflow: "hidden" }}
                >
                    {
                        Object.keys(cartItems).map((key, index) =>
                            <CartItem
                                key={index}
                                cartItem={cartItems[key]}
                                onRemoveCartItem={onRemoveCartItem}
                            />
                        )
                    }
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            background: "#ffffff",
                            justifyContent: "flex-end",
                            boxShadow: "0 0 10px 10px #eee",
                            padding: "10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "250px" }}>
                            <MaterialButton
                                title="PLACE ORDER"
                                style={{bgColor:"#75E6DA"}}
                                onClick={()=> {window.location.href=`/checkout`;
                                props.history.push(`/checkout`)}}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    )

}
//export default CartPage