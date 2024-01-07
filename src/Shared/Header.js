import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Wordmark_DarkBlue.png';
import { AuthContext } from '../Context/AuthProvider';

const Header = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='bg-white shadow sticky top-0 z-50'>
            <nav className="max-w-7xl mx-auto px-6">
                    <div className="py-3 flex items-center justify-between w-full">
                        <div>
                            <Link to='/dashboard'>
                                <div className='h-10 w-auto'>
                                    <img className='h-full w-full' src={logo} alt="" />
                                </div>
                            </Link>
                        </div>

                        <div className='md:block hidden'>
                            <Link to="/">
                                <button className='bg-primary rounded-sm text-white px-5 py-3'>Dashboard</button>
                            </Link>
                    </div>
                    
                    {
                        user? <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost justify-start lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label> : ''
                    }
                    </div>
     



            </nav >

        </div>
    );
};

export default Header;