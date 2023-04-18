import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PieChart = () => {
    const [pieData, setPieData] = useState([]);
    // console.log(pieData);
    useEffect(() => {

        axios.get('http://localhost:5000/categories')
            .then(data => {
                const categories = data.data;
                const categoriesData = categories.map(category => {
                    const name = category?.name;
                    const value = category?.value;
                    // console.log(name, value);

                    const singleCategory = {
                        name,
                        value
                    }
                    return singleCategory;
                })
                // console.log(categoriesData);
                setPieData(categoriesData);
            })
    }, [])

    // console.log("pieData", pieData);


    return (
        <div>

        </div>
    );

};

export default PieChart;