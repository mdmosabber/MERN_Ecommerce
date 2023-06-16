import DashboardMenu from '../nav/DashboardMenu';
import Header from './Header';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductUpdate = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState({
    title: '',
    price: '',
    quantity: '',
    description: '',
    image: null,
  });

  useEffect(() => {   
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {

      const response = await axios.get(`/product/${params.id}`);
   
      const product = response.data.product;

      setData({
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        image: null,
      });
    } catch (error) {    
      console.log('Full error object:', error.response);
      toast.error('Failed to fetch product details.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!data.title || !data.price || !data.quantity || !data.description || !data.image) {
      toast.error('Please fill in all the fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('description', data.description);
    formData.append('image', data.image);

    try {
      const response = await axios.put(`/product/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token'),
        },
      });

      if (response.data.status === 'success') {
        toast.success('Product updated successfully');

        // Clear input field data
        setData({
          title: '',
          price: '',
          quantity: '',
          description: '',
          image: null,
        });

        navigate('/admin/products');
      } else {
        toast.error('Product update failed');
      }
    } catch (error) {
      console.error('Error Updating Product:', error);
      console.log('Full error object:', error.response);
      toast.error('Product update failed. Please try again!');
    }
  };


  // Product Delete
  const handleDelete = async () => {
    try {
      const answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
  
      const response = await axios.delete(`/product/${params.id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: localStorage.getItem('token'),
        },
      });
  
      if (response.data.status === 'success') {
        toast.success("Product Deleted Successfully");
      }
        navigate("/admin/products");

    } catch (error) {
      console.log(error);
      toast.error("Delete failed. Please try again.");
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
                  <h4 className='text-center mb-4'>Update Product </h4>
                  <form onSubmit={handleSubmit}>
                      <input type='text' onChange={handleChange} value={data.title} name='title' className='form-control mb-3' placeholder='Product Title' />
                      <input type='number' onChange={handleChange} value={data.price} name='price' className='form-control mb-3' placeholder='Price' />
                      <input type='number' onChange={handleChange} value={data.quantity} name='quantity' className='form-control mb-3' placeholder='Quantity' />
                      <textarea onChange={handleChange} value={data.description} name='description' className='form-control mb-3' placeholder='Description'></textarea>
                      <input type='file' onChange={handleImageChange} name='image' className='form-control' accept='image/*' />
                      

                    <div className="d-flex space-between">
                      <input type="submit" value="Update" className='btn btn-success mx-5' />
                      <button onClick={handleDelete} className="btn btn-danger mx-5"> Delete </button>
                    </div>

                  </form>
              </div>
          </div>                
      </div>
    </div>
  </div>
  )
}

export default ProductUpdate