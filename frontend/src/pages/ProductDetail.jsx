import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Menu from '../components/nav/Menu';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Menu />
      <div className='container mt-5'>
        <div className='row'>
          <h4 className='text-center'>Product Details</h4>

          <div className='col-md-4 mx-auto mt-4'>
            {product ? (
              <div className='border p-4'>
           
              
                <img src={`${process.env.REACT_APP_API}/src/${product.image}`} alt='img' />

                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: TK {product.price}</p>
                <p>Qty: {product.quantity}</p>
                <p>Created: {new Date(product.createdAt).toLocaleString()}</p>

                <Link to='/cart' className='btn btn-primary'>Add to Cart</Link>
              </div>
            ) : (
              <p>Loading product details...</p>
            )}
          </div>


        </div>
      </div>
    </>
  );
};

export default ProductDetail;
