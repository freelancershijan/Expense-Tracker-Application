import React, { useContext } from 'react';
import { BiMoney } from 'react-icons/bi';
import { AuthContext } from '../Context/AuthProvider';
import { Link } from 'react-router-dom/dist';
import Recent from '../Components/Recent';
import PieChart from '../Components/PieChart';

const Dashboard = () => {
    const { sum, cost, totalCosts, totalEarnings, getCurrentMonthCostsTotal, getCurrentMonthFundsTotal } = useContext(AuthContext);
    let rest = sum - cost;
    return (
        <div className='mx-2 md:mx-10'>
            <div class="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 justify-center mt-10">
                {/* <Link to='/dashboard/total-earning'> */}
                    <div class="lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                        <div class="bg-[#E5F8ED] rounded-full p-3">
                            <BiMoney className="w-6 h-6 text-green-500"></BiMoney>

                        </div>
                        <div>
                            <div class="text-lg font-semibold text-gray-800">${sum}</div>
                            <p class="text-gray-700">Total Funds</p>
                        </div>
                    </div>
                {/* </Link> */}
                {/* <Link to="/dashboard/total-cost"> */}
                    <div class=" lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                        <div class="bg-[#FEE8E2]  rounded-full p-3">
                            <BiMoney className="w-6 h-6 text-red-500"></BiMoney>
                        </div>

                        <div class="">
                            <div class="text-lg font-semibold text-gray-800">${cost}</div>
                            <p class="text-gray-700">Total Costs</p>
                        </div>
                    </div>
                {/* </Link> */}

                <div class=" lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                    <div class="bg-[#E5F8ED] rounded-full p-3">
                        <BiMoney className="w-6 h-6 text-green-500"></BiMoney>
                    </div>

                    <div class="">
                        <div class="text-lg font-semibold text-gray-800">${getCurrentMonthFundsTotal()}</div>
                        <p class="text-gray-700">This Month Funds</p>
                    </div>
                </div>
                <div class=" lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                    <div class="bg-[#FEE8E2] rounded-full p-3">
                        <BiMoney className="w-6 h-6 text-red-500"></BiMoney>
                    </div>

                    <div class="">
                        <div class="text-lg font-semibold text-gray-800">${getCurrentMonthCostsTotal()}</div>
                        <p class="text-gray-700">This Month Costs</p>
                    </div>
                </div>

            </div>



            <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center mt-10">
                <div class="lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                    <div class="bg-[#E5F8ED] rounded-full p-3">
                        <BiMoney className="w-6 h-6 text-green-500"></BiMoney>

                    </div>
                    <div class="">
                        <div class="text-lg font-semibold text-gray-800">${totalEarnings}</div>
                        <p class="text-gray-700">Previous Month Funds</p>
                    </div>
                </div>
                <div class=" lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-white rounded-lg shadow-lg">

                    <div class="bg-[#FEE8E2]  rounded-full p-3">
                        <BiMoney className="w-6 h-6 text-red-500"></BiMoney>
                    </div>

                    <div class="">
                        <div class="text-lg font-semibold text-gray-800">${totalCosts}</div>
                        <p class="text-gray-700">Previous Month Costs</p>
                    </div>
                </div>
                <div class=" lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center  bg-[#1B2850] rounded-lg shadow-lg">

                    <div class="border-white border-2 rounded-full p-3">
                        <BiMoney className="w-6 h-6 text-white"></BiMoney>
                    </div>

                    <div class="">
                        <div class="text-lg font-semibold text-white">${rest}</div>
                        <p class="text-white">Rest Funds</p>
                    </div>
                </div>


            </div>



            <div className='my-10'>
                <Recent />
            </div>

            <div className='my-10'>
                <PieChart />
            </div>



        </div>
    );
};

export default Dashboard;