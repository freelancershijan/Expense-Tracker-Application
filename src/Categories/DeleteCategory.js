import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const DeleteCategory = () => {
    const { categories, user } = useContext(AuthContext);
    const handleDelete = (ctg) => {
        const url = `${process.env.REACT_APP_API_URL}/categories/${ctg?._id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('Category Deleted Successfully')
                    fetch(`${process.env.REACT_APP_API_URL}/fund/${ctg?.name}/${user?.email}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Funds Deleted Successfully')
                                window.location.href = '/';
                            }
                        })
                        .catch(error => console.error(error));

                    fetch(`${process.env.REACT_APP_API_URL}/cost/${ctg?.name}/${user?.email}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Costs Deleted Successfully')
                                window.location.href = '/';
                            }
                        })
                        .catch(error => console.error(error));
                }
            })
    }


    return (



        <div className='md:m-20 m-3'>

            <Link to='/'>
                <button className='btn bg-black'>Back</button>
            </Link>

            <h3 className='text-center text-3xl font-semibold mb-10'>All Categories</h3>


            <div className="md:w-2/3 mx-auto border-2 border-black">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category Name</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            categories.map((ctg, i) => <tr className='hover' key={ctg?._id}>
                                <th>{i + 1}</th>
                                <td>{ctg?.name}</td>
                                <td>
                                    <button onClick={() => handleDelete(ctg)} className='px-5 py-3 bg-red-700 text-white rounded-sm hover:bg-red-900 transition duration-500 ease-in-out'>
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default DeleteCategory;