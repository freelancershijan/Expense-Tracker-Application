import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink, } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const SidebarComponent = () => {

  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
        .then(() => {
            console.log('successfuly logout');
            localStorage.removeItem('userEmail');
            toast.success('You have logged Out Successfully!!')
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('error', error.message)
        })
}



  return (
    <div className='sticky top-0 relative bg-primary h-screen w-full'>

    <div className=' w-full'> 
        <div className='w-full h-40 bg-white'>
            {
                user?.photoURL ? <img className='w-full h-full object-contain' src={user?.photoURL} alt="" /> : <FaUserCircle className='w-full h-full p-6 bg-gray-200'/>
            }
            
        </div>
        <div className='text-center p-5 bg-primary text-white'>
              <h2 className='text-xl'>{user?.displayName}</h2>
              <p className='text-sm'>{ user?.email}</p>
        </div>
      </div> 
      
      <div className='border-b border-white'></div>

    <div className='py-5'>
          
   
    <ul className="list-none p-0 m-0 overflow-hidden">
        
                       <li className='my-1'>
                           <NavLink to="/" className="flex items-center cursor-pointer px-5 py-3 focus:bg-black rounded-sm hover:bg-black hover:text-white text-white active:bg-black">
                               <i className="pi pi-home mr-2"></i>
                               <span className="font-medium">Dashboard</span>
                           </NavLink>
                       </li>
        <li className='my-1'>
            <NavLink to='/fund-category' className="flex items-center cursor-pointer px-5 py-3  focus:bg-black rounded-sm hover:bg-black hover:text-white text-white active:bg-black">
                <i className="pi pi-money-bill mr-2"></i>
                <span className="font-medium">Funds Category</span>
            </NavLink>
        </li> 
     <li className='my-1'>
            <NavLink to='/cost-category' className="flex items-center cursor-pointer px-5 py-3  focus:bg-black rounded-sm hover:bg-black hover:text-white text-white active:bg-black">
                <i className="pi pi-money-bill mr-2"></i>
                <span className="font-medium">Cost Category</span>
            </NavLink>
        </li> 
                      
 <li className='my-1'>
            <NavLink to='/add-fund' className="flex items-center cursor-pointer px-5 py-3  focus:bg-black rounded-sm hover:bg-black hover:text-white text-white active:bg-black">
                <i className="pi pi-plus mr-2"></i>
                <span className="font-medium">Add Fund</span>
            </NavLink>
        </li> 
    <li className='my-1'>
            <NavLink to='/add-cost' className="flex items-center cursor-pointer px-5 py-3  focus:bg-black rounded-sm hover:bg-black hover:text-white text-white active:bg-black">
                <i className="pi pi-plus mr-2"></i>
                <span className="font-medium">Add Cost</span>
            </NavLink>
        </li>
     <li className='my-1'>
            <NavLink to='/settings' className="flex items-center cursor-pointer px-5 py-3  focus:bg-black rounded-sm hover:bg-black hover:text-white text-white active:bg-black">
                <i className="pi pi-cog mr-2"></i>
                <span className="font-medium">Settings</span>
            </NavLink>
          </li>   
          <li className='mt-5'>
                 <div onClick={handleLogout} >
                                <button className='py-3 rounded-sm bg-black flex  items-center justify-center gap-2 w-full text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
          </li>
    </ul>
      </div>
      
                         
</div>
  );
};

export default SidebarComponent;