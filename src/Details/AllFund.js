import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const AllFund = () => {
    const { funds } = useContext(AuthContext);
    return (
        <div>
            <Link to='/dashboard'>
                <button className='btn bg-black mb-5'>Back</button>
            </Link>

            {
                funds.length === 0 ? <div className="card my-20 w-1/2 mx-auto bg-gray-700 text-neutral-content"> <div className="card-body items-center text-center">

                    <h1 className='text-3xl font-semibold'>You have Not any Funds</h1>

                </div></div> :
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Money</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Notes</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    funds.map((fnd, i) => <tr className='hover' key={fnd?._id}>
                                        <th>{i + 1}</th>
                                        <td>{fnd?.category}</td>
                                        <td>{fnd?.money}</td>
                                        <td>{fnd?.date}</td>
                                        <td>{fnd?.time}</td>
                                        <td>{fnd?.notes}</td>
                                    </tr>)
                                }
                            </tbody>

                        </table>
                    </div>
            }

        </div>
    );
};

export default AllFund;