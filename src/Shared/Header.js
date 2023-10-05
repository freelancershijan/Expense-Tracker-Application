import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/shijan.jpg';

const Header = () => {


    return (
        <div className=''>
            <nav className="w-full bg-[#004767] shadow sticky top-0 z-50">

                <div className='flex items-center justify-between mx-5'>
                    <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost justify-start lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <div className="py-3 flex items-center justify-between md:w-full md:mx-20">
                        <div>
                            <NavLink to='/dashboard'>
                                <img className='h-20 rounded-full' src={logo} alt="" />
                            </NavLink>
                        </div>

                        <div className='md:block hidden'>
                            <NavLink to="/dashboard">
                                <button className='btn btn-primary'>Dashboard</button>
                            </NavLink>
                        </div>
                    </div>
                </div>



            </nav >

        </div>
    );
};

export default Header;