import React, { useContext } from 'react';
import AllCategories from './Categories/AllCategories';
import PieChart from './Components/PieChart';
import TotalCount from './TotalCount/TotalCount';
import { AuthContext } from './Context/AuthProvider';
import { toast } from 'react-hot-toast';


const Home = () => {

    const { logOut } = useContext(AuthContext);


    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('successfuly logout');
                localStorage.removeItem('userEmail');
                toast.success('You have logged Out Successfully!!')
                window.location.href = '/';
            })
            .catch(error => {
                console.error('error', error.message)
            })
    }


    return (
        <div>

            <div className='flex items-center justify-between'>
                <button onClick={() => handleLogout()} className='bg-red-700 btn'>Logout</button>
                <h2 className='text-center my-10 text-cyan-800 text-3xl font-semibold'>Welcome to Expense Tracking Software</h2>
            </div>

            <TotalCount />
            <AllCategories />
            <PieChart></PieChart>



        </div >
    );
};

export default Home;