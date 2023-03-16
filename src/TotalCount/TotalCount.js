import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';

import { Link } from 'react-router-dom';


const TotalCount = () => {

    const { sum, cost, totalCosts, totalEarnings, getCurrentMonthCostsTotal, getCurrentMonthFundsTotal } = useContext(AuthContext);




    return (
        <div>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className="card  bg-green-700 text-neutral-content">
                    <Link to='/total-earning'>
                        <div className="card-body items-center text-center">
                            <h3 className="card-title">Total Earning</h3>
                            <h1 className='text-3xl font-semibold'>${sum}</h1>

                        </div>
                    </Link>
                </div>
                <div className="card my-5 md:my-0 bg-red-700 text-neutral-content">
                    <Link to="/total-cost">
                        <div className="card-body items-center text-center">
                            <h3 className="card-title">Total Cost</h3>
                            <h1 className='text-3xl font-semibold'>${cost}</h1>

                        </div>
                    </Link>
                </div>
                <div className="card my-5 md:my-0 bg-green-700 text-neutral-content">
                    <Link to="/current-month-funds">
                        <div className="card-body items-center text-center">
                            <h3 className="card-title">This Month Earning</h3>
                            <h1 className='text-3xl font-semibold'>${getCurrentMonthFundsTotal()}</h1>

                        </div>
                    </Link>
                </div>
                <div className="card my-5 md:my-0 bg-red-700 text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h3 className="card-title">This Month Cost</h3>
                        <h1 className='text-3xl font-semibold'>${getCurrentMonthCostsTotal()}</h1>

                    </div>
                </div>


            </div>

            <div className='grid md:grid-cols-2 gap-5 my-5'>

                <div className="card bg-green-700 text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h1 className='text-xl font-semibold'>Previous Month Earning: ${totalEarnings}</h1>
                    </div>
                </div>


                <div className="card bg-red-700 text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h1 className='text-xl font-semibold'>Previous Month Costs: ${totalCosts}</h1>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default TotalCount;