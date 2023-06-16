import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardMenu from '../nav/DashboardMenu';
import Header from './Header';

const AdminProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      loadProducts();
    }, []);
  
    const loadProducts = async () => {
      try {
        const { data } = await axios.get('/products/');
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="container-fluid px-0">
      <div className="wrapper">
        <DashboardMenu />
        <div className="main">
          <div className="main__inner">
            <Header />
            <div className="main__inner__body">

                <div className='row'>
                    {products.map((product) => (
                        <div className='col-md-4 py-3'>
                        <div className='text-center border'>
                            <Link key={product._id} to={`/admin/product/update/${product._id}`}>
                            <div>                   
                             
                                <img src={`${process.env.REACT_APP_API}/src/${product.image}`} alt='img' />                                                         
                              
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </div>
                            </Link>
                        </div>
                        </div>
                    ))}
                </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts















