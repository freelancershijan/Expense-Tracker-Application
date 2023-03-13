import React from 'react';
import AllCategories from './Categories/AllCategories';
import TotalCount from './TotalCount/TotalCount';

const Home = () => {
    return (
        <div>
            <TotalCount />
            <AllCategories />
        </div>
    );
};

export default Home;