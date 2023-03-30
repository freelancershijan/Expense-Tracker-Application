import React from 'react';
import Login from './Components/login/Login/Login';
import AllCategories from './Categories/AllCategories';
import PieChart from './Components/PieChart';
import TotalCount from './TotalCount/TotalCount';


const Home = () => {


    return (
        <div>

            <h2 className='text-center my-10 text-cyan-800 text-3xl font-semibold'>Welcome to Expense Tracking Software</h2>

            <TotalCount />
            <AllCategories />
            <PieChart></PieChart>


            {/* <Login></Login> */}

        </div >
    );
};

export default Home;