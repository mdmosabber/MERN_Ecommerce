import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import {NavLink} from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
  
    const isAuthenticated = () => {
      return localStorage.getItem('token') !== null;
    };

    if (!isAuthenticated()) {
      navigate('/login');
    }

  }, []);




  return (
   
    
    <div class="container-fluid px-0">
        <div class="wrapper">       
        <div class="navigation">
        <ul>
            <li>
                <NavLink className="nav-link" to="/dashboard/admin">                   
                    <span class="title">Ecommerce</span>
                </NavLink>
            </li>
            <li>
                <NavLink className="nav-link" to="/dashboard/admin"> 
                    <span class="icon"> <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.57747 20.4507H3.60563V10.8169H0L12 0L24 10.8169H20.3944V20.4507H14.4225V13.2394H9.57747V20.4507Z" fill="white"/>
                        </svg>
                        </span>
                    <span class="title">Dashboard</span>
                </NavLink>
            </li>  
        </ul>         
    </div>

        
            <div class="main">
                <div class="main__inner">
                    <Header/>                
                    <div class="main__inner__body">



                    </div>
                </div>                
            </div>
        </div>
    </div>
    


   
  );
};

export default Dashboard;





