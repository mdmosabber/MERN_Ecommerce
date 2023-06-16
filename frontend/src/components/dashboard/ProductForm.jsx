import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import DashboardMenu from '../nav/DashboardMenu';
import Header from './Header';

const ProductForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    price: '',
    quantity: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData((prevState) => ({
      ...prevState,
      image: file
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
      const response = await axios.post('/product/',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': localStorage.getItem('token')
        }
      });

   
      if (response.data.status === 'success') {
        toast.success("Product Added Successfully");

        // Clear input field data
        setData({
          title: '',
          price: '',
          quantity: '',
          description: '',
          image: null
        });

        navigate('/admin/products');

      } else {
        toast.error("Product Add Failed.");
      }

    } catch (error) {
      console.error('Error Adding Product:', error);
      console.log('Full error object:', error.response);
      toast.error("Product Add Error, Please try again!");
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
                    <h4 className='text-center mb-4'>Create Product Form</h4>
                    <form onSubmit={handleSubmit}>
                        <input type='text' onChange={handleChange} value={data.title} name='title' className='form-control mb-3' placeholder='Product Title' />
                        <input type='number' onChange={handleChange} value={data.price} name='price' className='form-control mb-3' placeholder='Price' />
                        <input type='number' onChange={handleChange} value={data.quantity} name='quantity' className='form-control mb-3' placeholder='Quantity' />
                        <textarea onChange={handleChange} value={data.description} name='description' className='form-control mb-3' placeholder='Description'></textarea>
                        <input type='file' onChange={handleImageChange} name='image' className='form-control' accept='image/*' />
                        <input type="submit" value="Submit" className='btn btn-success w-100' />
                    </form>
                </div>
            </div>                
        </div>
      </div>
    </div>

  )
}

export default ProductForm