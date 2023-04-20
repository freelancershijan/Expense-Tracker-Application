import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const DeleteCategory = () => {
    const { categories, user } = useContext(AuthContext);
    console.log('user from deletecategory', user?.email);


    const handleDelete = (ctg) => {


        const url = `http://localhost:5000/categories/${ctg?._id}`;

        console.log(url);


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




                    fetch(`http://localhost:5000/fund/${ctg?.name}/${user?.email}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {

                            if (data.acknowledged) {
                                toast.success('Funds Deleted Successfully')
                                window.location.href = '/dashboard';

                            }


                        })
                        .catch(error => console.error(error));



                    fetch(`http://localhost:5000/cost/${ctg?.name}/${user?.email}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {

                            if (data.acknowledged) {
                                toast.success('Costs Deleted Successfully')
                                window.location.href = '/dashboard';

                            }


                        })
                        .catch(error => console.error(error));





                }


            })




    }


    return (



        <div className='md:m-20 m-3'>

            <Link to='/dashboard'>
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
                                    <button onClick={() => handleDelete(ctg)} className='btn bg-red-700'>
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