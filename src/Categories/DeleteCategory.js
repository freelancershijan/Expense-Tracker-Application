import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const DeleteCategory = () => {
    const { categories, funds } = useContext(AuthContext);
    // const navigate = useNavigate();
    const handleDelete = (ctg) => {



        const url = `https://expense-tracker-application-server.vercel.app/categories/${ctg?._id}`;
        // console.log(url);
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
                    window.location.href = '/';
                    // navigate('/');
                }

                //   const remaining= myProducts.filter(product => product._id )
            })


        console.log('from', ctg?.name);
        // console.log(costs);
        console.log(funds);

        // const dltCost = costs.filter(cst => cst?.category === ctg?.name);
        const dltFund = funds.filter(cst => cst?.category === ctg?.name);

        console.log(dltFund);



        fetch(`https://expense-tracker-application-server.vercel.app/funds/${ctg?.name}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('Funds Deleted Successfully')
                    window.location.href = '/';
                    // navigate('/');
                }

                //   const remaining= myProducts.filter(product => product._id )
            })




        fetch(`https://expense-tracker-application-server.vercel.app/costs/${ctg?.name}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('Funds Deleted Successfully')
                    window.location.href = '/';
                }

            })




    }


    return (



        <div>

            <Link to='/'>
                <button className='btn bg-black'>Back</button>
            </Link>

            <h3 className='text-center text-3xl font-semibold mb-10'>All Categories</h3>


            <div className="md:w-1/2 mx-auto">
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
                            categories.map(ctg => <tr className='hover' key={ctg?._id}>
                                <th>*</th>
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