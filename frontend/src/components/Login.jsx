import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();   

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('/api/v1/admin-check', {
                        headers: {
                            'authorization': token
                        }
                    });
    
                    if (response.data.role === 1) {
                        navigate('/dashboard/admin');
                    } else {
                        navigate('/dashboard/user');
                    }
                }
            } catch (error) {
                console.error('Error checking authentication:', error);             
            }
        };
    
        checkAuthentication();
    }, []);
    

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        const value = event.target.value;
        setData({
            ...data,
            [event.target.name] : value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Form validation
        if (!data.email || !data.password) {
            toast.error('Please fill in all the fields');
            return;
        }
        const userData = {
            email: data.email,
            password: data.password,   
        }

        try {
            const {data} = await axios.post('/login/', userData);

            if (data.status === 'success') {
                toast.success("Login Successfully");
        
                // Clear input field data
                setData({
                    email: '',
                    password: '',  
                });

                // Store the token in local storage
                localStorage.setItem('token', data.token);
                  
               let dashboardRoute = '/dashboard/user';
               if (data?.user?.role === 1) {
                   dashboardRoute = '/dashboard/admin';
               }
               navigate(dashboardRoute);
        
            } else {
                toast.error("Login Failed.");
            }

        } catch (error) {
            console.error('Error logging in:', error);
            toast.error("Login Fail, Please try again!");
        }


    }



return (

    <>
    <div className='circle-form'>
        <div className='form-wrapper'>
            <div className='circle'>
                <form onSubmit={handleSubmit}>
                    <p className='sign-title'>Sign In</p>
                    <input type='email' onChange={handleChange} value={data.email} className='user' name='email' placeholder='Enter Your Email'/>
                    <input type='password' onChange={handleChange} value={data.password} className='pass' name='password' placeholder='Enter Your Password' />

                    <input type="submit" class="btn" value="Sign In" />
    
                    <p className="dont"> Don't have an account                 
                    <NavLink to="/register" className='px-2'> Sign Up </NavLink>
                    </p>
                </form>
            </div>
        </div>
    </div>

    </>
  )
}

export default Login;