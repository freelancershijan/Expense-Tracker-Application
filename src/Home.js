import React from 'react';
import bgImage from './images/home-page-banner.png';

const Home = () => {
    return (
        <div className="">
            <img className='h-screen w-full relative' src={bgImage} alt="" />
            <h1 className='md:text-4xl text-2xl font-semibold text-center absolute top-[10%] mt-20 lg:left-[25%] mx-auto'>Welcome to Visit My Expense Tracking Software. <br></br> I hope you will Enjoy this Software Features</h1>
            
        </div>
    );
};

export default Home;