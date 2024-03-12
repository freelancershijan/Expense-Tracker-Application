import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';


const AddFund = () => {
    const { fundCategories,email, categories, user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const money = Math.round(form.money.value);
        const date = form.date.value;
        const time = form.time.value;
        const notes = form.notes.value;

        const fundDetails = {
            category,
            money,
            date,
            time,
            notes,
            user: user?.email
        }

        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/funds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fundDetails)
        })
            .then(res => res.json())
            .then(data => {
                try {
                if (data.acknowledged) {
                    toast.success('Congratulation!! Added Your Funds');
                }
                else {
                    toast.error(data.message)
                }

                // update price
                const prevCategories = categories.find(ctg => ctg.name === fundDetails.category)
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
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while processing the request.");
            } finally {
                window.location.href = '/'; // Move this inside the finally block
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
        });
    };
    return (
        <div>
            {
                fundCategories.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center'>
                    <div>
                    <h1 className='md:text-2xl sm:text-xl text-lg text-center font-semibold'>You Have not any Fund Category Please Create a Fund Category FIrst</h1>
                    <Link to="/fund-category">
                        <div className='text-center'>
                            <button className='px-5 py-3 bg-primary text-white rounded-sm mt-5'>Create Fund Category</button>
                        </div>
                    </Link>
                    </div>
                </div> :
                        <div className="modal-box rounded-sm mx-auto">
                            <form onSubmit={handleSubmit}>
                                <h3 className='text-center text-3xl font-semibold mb-10'>Add Funds</h3>
                                <div className="mb-4">


                                    <label className="block text-gray-700 dark:text-white font-bold mb-2" htmlFor="category">
                                        Select Category
                                    </label>

                                    <select
                                        required
                                        id="category"
                                        name="category"
                                        className="block appearance-none w-full dark:text-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        {
                                            fundCategories.map(ctg => <option key={ctg?._id} value={ctg?.name}>{ctg?.name}</option>)
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>



                                <div className="modal-action">
                                    <button type='submit' htmlFor="fund-modal" className="px-5 py-3 bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed text-white rounded-sm" disabled={isLoading}>
                                    {isLoading ? <LoadingSpinner /> : 'Add Fund'}
                                    </button>
                                </div>
                            </form>
                        </div>
            }



        </div>
    );
};

export default AddFund;