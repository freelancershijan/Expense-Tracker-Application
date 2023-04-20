import React from 'react';
import bgImage from './images/home-page-banner.png';
import { Link } from 'react-router-dom/dist';
const Home = () => {
    return (
        <div className="">
            <img className='h-screen w-full relative' src={bgImage} alt="" />
            <h1 className='md:text-4xl text-2xl font-semibold text-center absolute top-[10%] lg:left-[25%] mx-auto'>Welcome to Visit My Expense Tracking Software. <br></br> I hope you will Enjoy this Software Features</h1>
            <Link to='/dashboard'>
                <button className='btn btn-primary absolute top-0 left-0'>View Dashboard</button>
            </Link>
        </div>
    );
};

export default Home;