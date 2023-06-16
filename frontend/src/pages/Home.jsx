import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../components/nav/Menu';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/card.js";

const Home = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Menu />

      <div className="container">
        <div className='row'>
          {products.map((product) => (
            <div className='col-md-4 py-3' key={product._id}>
              <div className='text-center border'>
                <div>
                  <img src={`${process.env.REACT_APP_API}/src/${product.image}`} alt='img' />

                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>

                  <div className='d-flex justify-content-between'>
                    <button className="btn btn-success me-4"                              
                      onClick={() => navigate(`/product/${product._id}`)}>
                      View Product
                    </button>

                    <button className='btn btn-info ms-4'
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem("cart", JSON.stringify([...cart, product]));
                        toast.success("Added to cart");
                      }}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
