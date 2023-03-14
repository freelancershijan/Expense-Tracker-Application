import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';

const TotalCount = () => {
    const { fundCategories, costCategories } = useContext(AuthContext);
    const funds = fundCategories.map(fnd => fnd?.value);
    const costs = costCategories.map(fnd => fnd?.value);

    const sum = funds.reduce((acc, val) => acc + val, 0);
    const cost = costs.reduce((acc, val) => acc + val, 0);
    // console.log(sum);

    return (
        <div>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className="card  bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h3 className="card-title">Total Earning</h3>
                        <h1 className='text-3xl font-semibold'>${sum}</h1>

                    </div>
                </div>
                <div className="card my-5 md:my-0 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h3 className="card-title">Total Cost</h3>
                        <h1 className='text-3xl font-semibold'>${cost}</h1>

                    </div>
                </div>
                <div className="card my-5 md:my-0 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h3 className="card-title">This Month Earning</h3>
                        <h1 className='text-3xl font-semibold'>$1000</h1>

                    </div>
                </div>
                <div className="card my-5 md:my-0 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h3 className="card-title">This Month Cost</h3>
                        <h1 className='text-3xl font-semibold'>$1000</h1>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default TotalCount;