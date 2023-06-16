import React from 'react';
import Menu from '../components/nav/Menu';
import { useCart } from "../context/card";
import { useNavigate } from "react-router-dom";
import CartSidebar from "../components/CartSidebar";

const Cart = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <>
      <Menu />
      <div className='container mt-5'>

      <div className='row'>
      <h4 className='text-center'>My Cart</h4>
        <div className='col-lg-8'>
        {cart.length ? (
          <div className="row">
           
            {cart.map((product, index) => (
              <div className='col-md-6 mt-4' key={index}>
                <div className='border p-4'>
             
                
                  <img src={`${process.env.REACT_APP_API}/src/${product.image}`} alt='img' />

                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>Price: TK {product.price}</p>
                  <p>Qty: {product.quantity}</p>
                  <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
                  <p
                    className="btn btn-danger text-right mb-0"
                    onClick={() => removeFromCart(product._id)}>
                    Remove
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h4>Your Cart is Empty</h4>
            <p>Add items to your cart go to shopping  </p>
            <button  className="btn btn-primary w-25 text-center" onClick={() => navigate("/")} >
                Continue Shopping
              </button>
          </div>
        )}
        </div>

        <div className='col-lg-4'>

          <CartSidebar />


        </div>
      </div>


      </div>
    </>
  )
}

export default Cart;
