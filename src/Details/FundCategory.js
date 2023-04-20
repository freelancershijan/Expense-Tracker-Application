import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const FundCategory = () => {
    const fundsCategories = useLoaderData([]);
    console.log('fundcategories', fundsCategories);
    const { categories } = useContext(AuthContext);

    const email = localStorage.getItem('userEmail');
    console.log('email from categories', email);
    const filtr = fundsCategories.filter(ctg => ctg?.user == email)
    console.log('filtet from fudscartegories', filtr);


    let fndctgoris = fundsCategories.map(fctg => fctg?.category);
    console.log(fndctgoris);


    let ctgoris = categories.filter(ctg => ctg?.name === fndctgoris[0])



    // delete single fund

    const handleDelete = fnd => {
        fetch(`http://localhost:5000/funds/${fnd._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('Product Deleted Successfully');

                    // const ctgoris = categories.filter(ctg => ctg.name === fnd?.category);

                    // console.log(ctgoris?.value);





                    const price = fnd?.money

                    const updateValue = {
                        value: ctgoris[0].value - price
                    }
                    console.log(updateValue);

                    const email = localStorage.getItem('userEmail');


                    fetch(`http://localhost:5000/categories/${fnd?.category}/${email}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateValue)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success("Price Updated Successfully");
                            window.location.href = '/dashboard';
                            console.log(data.message); // Output success message
                            // Perform any additional actions, such as updating the state of your component
                        })
                        .catch(err => console.error(err));


                }
            })

    }



    return (
        <div className='md:m-20 m-2'>
            <Link to='/dashboard/fund-category'>
                <button className='btn bg-black mb-5'>Back</button>
            </Link>
            {
                filtr.length === 0 ? <div className="card my-20 w-2/3 mx-auto bg-gray-700 text-neutral-content">

                    <div className="card-body items-center text-center">

                        <h1 className='text-3xl font-semibold'>You have Not any Funds in this Fund</h1>

                    </div>

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
                                    <td><button onClick={() => handleDelete(fnd)} className='btn bg-red-700'>Delete</button></td>
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