import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';

const Recent = () => {
    const { recent, recentCost } = useContext(AuthContext);
    console.log("recent", recent);
    return (
        <div className='grid md:grid-cols-2 gap-5 my-10'>
            <div>
                <h1 className='text-3xl text-black font-semibold text-center mb-5'>Recent Added Funds</h1>

                {
                    recent.length === 0 ? <div className='bg-white mt-20 md:mx-20'>
                        <h3 className='text-center text-xl'> You have not added any Funds yet</h3>
                    </div> :
                        <div className='border-black border-2'>
                            <div className="overflow-x-auto w-full">
                                <table className="table table-zebra w-full">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Category</th>
                                            <th>Money</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            recent.slice(0, 5).map((rc, i) => <tr key={rc._id} className='hover'>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <div className="flex items-center space-x-3">

                                                        <div>
                                                            <div className="font-bold">{rc.date}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {rc.category}

                                                </td>
                                                <td>${rc.money}</td>

                                            </tr>)
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </div>
                }
            </div>

            <div>
                <h1 className='text-3xl text-black font-semibold text-center mb-5'>Recent Added Costs</h1>

                {
                    recentCost.length === 0 ? <div className='bg-white mt-20 md:mx-20'>
                        <h3 className='text-center text-xl'> You have not added any costs yet</h3>
                    </div>

                        : <div className='border-black border-2'>
                            <div className="overflow-x-auto w-full">
                                <table className="table  table-zebra w-full">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Date</th>
                                            <th>Category</th>
                                            <th>Money</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            recentCost.slice(0, 5).map((rc, i) => <tr key={rc._id} className='hover'>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <div className="flex items-center space-x-3">

                                                        <div>
                                                            <div className="font-bold">{rc.date}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {rc.category}

                                                </td>
                                                <td>${rc.money}</td>

                                            </tr>)
                                        }

                                    </tbody>


                                </table>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Recent;