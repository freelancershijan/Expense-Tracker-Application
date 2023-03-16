import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const AllCost = () => {
    const { costs } = useContext(AuthContext);



    return (
        <div>
            <Link to='/'>
                <button className='btn bg-black mb-5'>Back</button>
            </Link>
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
                            costs.map((fnd, i) => <tr className='hover' key={fnd?._id}>
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
        </div>
    );
};

export default AllCost;