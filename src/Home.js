import React from 'react';
import AllCategories from './Categories/AllCategories';
import PieChart from './Components/PieChart';
import TotalCount from './TotalCount/TotalCount';

const Home = () => {
    return (
        <div>
            <TotalCount />
            <AllCategories />
            <PieChart></PieChart>
        </div>
    );
};

export default Home;