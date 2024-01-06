import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const FundCategory = () => {
    const fundsCategories = useLoaderData([]);
    console.log('fundcategories', fundsCategories);
    const { categories,email } = useContext(AuthContext);

    const filtr = fundsCategories.filter(ctg => ctg?.user === email)
    let fndctgoris = fundsCategories.map(fctg => fctg?.category);
    let ctgoris = categories.filter(ctg => ctg?.name === fndctgoris[0])

    // delete single fund
    const handleDelete = fnd => {
        fetch(`${process.env.REACT_APP_API_URL}/funds/${fnd._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Product Deleted Successfully');
                    const price = fnd?.money
                    const updateValue = {
                        value: ctgoris[0].value - price
                    }
                    fetch(`${process.env.REACT_APP_API_URL}/categories/${fnd?.category}/${email}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateValue)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success("Price Updated Successfully");
                            window.location.href = '/';
                            console.log(data.message); 
                        })
                        .catch(err => console.error(err));
                }
            })
    }



    return (
        <div className='m-10'>
            <Link to='/fund-category'>
                <button className='px-5 py-3 text-white bg-primary rounded-sm mb-5'>Back</button>
            </Link>
            {
                filtr.length === 0 ? <div className=" bg-gray-700 text-neutral-content">
                        <h1 className='text-3xl font-semibold text-center'>You have Not any Funds in this Fund</h1>
                </div> : <div className="overflow-x-auto border-2 border-black">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Money</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Notes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filtr.map((fnd, i) => <tr className='hover' key={fnd?._id}>
                                    <th>{i + 1}</th>
                                    <td>{fnd?.category}</td>
                                    <td>{fnd?.money}</td>
                                    <td>{fnd?.date}</td>
                                    <td>{fnd?.time}</td>
                                    <td>{fnd?.notes}</td>
                                    <td><button onClick={() => handleDelete(fnd)} className='px-5 py-3 bg-red-700 text-white rounded-sm hover:bg-red-900 transition duration-500 ease-in-out'>Delete</button></td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>

            }
        </div>
    );
};

export default FundCategory;