import React from 'react';
import {NavLink} from 'react-router-dom';

const DashboardMenu = () => {



  return (

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
            <li>
                <NavLink className="nav-link" to="/admin/productCreate">  
                    <span class="icon"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0282 12C18.0282 12.338 17.8967 12.6197 17.6338 12.8451C17.4085 13.0704 17.1268 13.1831 16.7887 13.1831H4.78873L0 18.0282V1.1831C0 0.84507 0.112676 0.56338 0.338028 0.338028C0.56338 0.112676 0.84507 0 1.1831 0H16.7887C17.1268 0 17.4085 0.112676 17.6338 0.338028C17.8967 0.56338 18.0282 0.84507 18.0282 1.1831V12ZM22.8169 4.78873C23.1549 4.78873 23.4366 4.90141 23.662 5.12676C23.8873 5.35211 24 5.6338 24 5.97183V24L19.2113 19.2113H5.97183C5.6338 19.2113 5.35211 19.0986 5.12676 18.8732C4.90141 18.6479 4.78873 18.3662 4.78873 18.0282V15.6056H20.3944V4.78873H22.8169Z" fill="white"/>
                        </svg>
                        </span>
                    <span class="title">Create Product</span>
                </NavLink>
            </li>               
            <li>
                <NavLink className="nav-link" to="/admin/products"> 
                    <span class="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.3832 0 0 5.3832 0 12C0 18.6168 5.3832 24 12 24C18.6168 24 24 18.6168 24 12C24 5.3832 18.6168 0 12 0ZM13.2 17.898V19.2H10.8V17.904C7.9932 17.4636 7.2 15.5016 7.2 14.4H9.6C9.6132 14.5716 9.7908 15.6 12 15.6C13.656 15.6 14.4 14.898 14.4 14.4C14.4 14.0112 14.4 13.2 12 13.2C7.824 13.2 7.2 10.944 7.2 9.6C7.2 8.0544 8.4348 6.4992 10.8 6.102V4.8144H13.2V6.1452C15.2808 6.6372 16.08 8.3688 16.08 9.6H14.88L13.68 9.6216C13.6632 9.1656 13.422 8.4 12 8.4C10.4412 8.4 9.6 9.0192 9.6 9.6C9.6 10.0488 9.6 10.8 12 10.8C16.176 10.8 16.8 13.056 16.8 14.4C16.8 15.9456 15.5652 17.5008 13.2 17.898Z" fill="white"/>
                        </svg>
                        </span>
                    <span class="title">Products</span>
                </NavLink>
            </li>

            <li>
                <a href="#">
                    <span class="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.3832 0 0 5.3832 0 12C0 18.6168 5.3832 24 12 24C18.6168 24 24 18.6168 24 12C24 5.3832 18.6168 0 12 0ZM13.2 17.898V19.2H10.8V17.904C7.9932 17.4636 7.2 15.5016 7.2 14.4H9.6C9.6132 14.5716 9.7908 15.6 12 15.6C13.656 15.6 14.4 14.898 14.4 14.4C14.4 14.0112 14.4 13.2 12 13.2C7.824 13.2 7.2 10.944 7.2 9.6C7.2 8.0544 8.4348 6.4992 10.8 6.102V4.8144H13.2V6.1452C15.2808 6.6372 16.08 8.3688 16.08 9.6H14.88L13.68 9.6216C13.6632 9.1656 13.422 8.4 12 8.4C10.4412 8.4 9.6 9.0192 9.6 9.6C9.6 10.0488 9.6 10.8 12 10.8C16.176 10.8 16.8 13.056 16.8 14.4C16.8 15.9456 15.5652 17.5008 13.2 17.898Z" fill="white"/>
                        </svg>
                        </span>
                    <span class="title">Manage Order</span>
                </a>
            </li>

        </ul>         
    </div>

   
  )
}

export default DashboardMenu