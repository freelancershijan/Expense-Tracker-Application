import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const PieChart = () => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {

        axios.get('https://expense-tracker-application-server.vercel.app/categories/')
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
        <ResponsiveContainer width={1024} height="80%">
            <BarChart data={pieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer >
    );
};

export default PieChart;