import axios from 'axios';
import { useEffect, useState } from 'react'

const AdminRoute = ()=> {

    const [ok, setOk] = useState(false);

    useEffect(() => {
        const adminCheck = async () => {
          try {
            const token = localStorage.getItem('token');

            if (!token) {           
              return;
            }
    
            const { data } = await axios.get('/admin-check', {
              headers: {
                'authorization': token
              }
            });
    
            if (data.ok) {
              setOk(true);
            } else {
              setOk(false);
            }
          } catch (error) {
            
          }
        };
    
        adminCheck();
      }, []);
 
}

export default AdminRoute;





