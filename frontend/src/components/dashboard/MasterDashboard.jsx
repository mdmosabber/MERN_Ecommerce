import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardMenu from '../nav/DashboardMenu';
import Header from './Header';



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
            <DashboardMenu/>  

        
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





