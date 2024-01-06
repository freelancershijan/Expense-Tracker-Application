import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { NavLink, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const DashboardLayout = () => {
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
        <div>
            <Header />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-[#F2F2F2]">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side bg-white">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>


                    <div>

                        <div className="avatar w-full  mt-10">
                            {user?.photoURL ? <div className="w-24 h-24 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} alt='user' />
                            </div> : <FaUserCircle className='w-24 h-24 mx-auto rounded-full ring ring-primary ring-offset-base-100 ring-offset-2' />}
                        </div>

                        <div className='text-center'>
                            <h2 className='text-xl font-semibold'>{user?.displayName}</h2>
                            <h4 className='font-semibold'>{user?.email}</h4>
                        </div>

                        <div className="divider"></div>

                        <ul className="menu p-4 lg:w-80 text-base-content">



                            <li><NavLink to='/'>Dashboard</NavLink></li>

                            <li><NavLink to='/fund-category'>Funds Category</NavLink></li>
                            <li><NavLink to='/cost-category'>Cost Category</NavLink></li>
                            <li><NavLink to='/add-fund'>Add Fund</NavLink></li>
                            <li><NavLink to='/add-cost'>Add Cost</NavLink></li>
                            <li><NavLink to='/settings'>Settings</NavLink></li>


                        </ul>


                        <div className='mx-5'>
                            <NavLink onClick={handleLogout} >
                                <button className='btn btn-primary w-full text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    Logout
                                </button>
                            </NavLink>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardLayout;