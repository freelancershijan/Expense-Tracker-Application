import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';

const AddCost = () => {

    const { costCategories,email, categories, user } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        const form = e.target;
        const category = form.category.value;
        const money = parseInt(form.money.value);
        const date = form.date.value;
        const time = form.time.value;
        const notes = form.notes.value;
        const costDetails = {
            category,
            money,
            date,
            time,
            notes,
            user: user?.email
        }

        fetch(`${process.env.REACT_APP_API_URL}/costs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(costDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Successfully Added Your Costs');
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(err => {
                console.log(err);
            })


        // update price
        const prevCategories = categories.find(ctg => ctg.name === costDetails.category)
        const prevValue = prevCategories.value;
        const prevName = prevCategories.name;
        const updateValue = {
            value: (prevValue + money),
        }
        fetch(`${process.env.REACT_APP_API_URL}/categories/${prevName}/${email}`, {
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
    };
    return (
        <div>
            {
                costCategories.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center'>
                    <div>
                    <h2 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Cost Category Please Create a Cost Category FIrst</h2>
                    <Link to="/cost-category">
                        <div className='text-center'>
                            <button className='px-5 py-3 bg-primary text-white rounded-sm mt-5'>Create Cost Category</button>
                        </div>
                    </Link>
                 </div>
                </div> :


                    <div className="">
                        <div className="modal-box rounded-sm mx-auto">

                            <form onSubmit={handleSubmit}>
                                <h3 className='text-center text-3xl font-semibold mb-10'>Add Cost</h3>
                                <div className="mb-4">


                                    <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="category">
                                        Select Category
                                    </label>

                                    <select
                                        required
                                        id="category"
                                        name="category"
                                        className="block dark:text-white appearance-none w-full border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

                                    >
                                        {
                                            costCategories.map(ctg => <option key={ctg?._id} value={ctg?.name}>{ctg?.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="money">
                                        Money
                                    </label>
                                    <input
                                        required
                                        id="money"
                                        name="money"
                                        type="number"
                                        step="0.01"
                                        className="shadow dark:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="date">
                                        Date
                                    </label>
                                    <input
                                        required
                                        id="date"
                                        name="date"
                                        type="date"
                                        className="shadow dark:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="time">
                                        Time
                                    </label>
                                    <input
                                        required
                                        id="time"
                                        name="time"
                                        type="time"
                                        className="shadow dark:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="notes">
                                        Notes
                                    </label>
                                    <input
                                        required
                                        id="notes"
                                        name="notes"
                                        type="text"
                                        className="shadow dark:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                    />
                                </div>



                                <div className="modal-action">
                                    <button type='submit' htmlFor="cost-modal" className="px-5 py-3 bg-primary text-white rounded-sm">Add Cost</button>
                                </div>
                            </form>



                        </div>
                    </div>
            }



        </div>
    );
};

export default AddCost;