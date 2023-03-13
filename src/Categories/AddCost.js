import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';

// 

const AddCost = () => {
    const [category, setCategory] = useState('');
    const [money, setMoney] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');

    const { categories } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };
    return (



        <div>

            <input type="checkbox" id="cost-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <label htmlFor="cost-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <form onSubmit={handleSubmit}>
                        <h3 className='text-center text-3xl font-semibold mb-10'>Add Cost</h3>
                        <div className="mb-4">


                            <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                                Select Category
                            </label>

                            <select
                                id="category"
                                name="category"
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {
                                    categories.map(ctg => <option key={ctg?._id} value={ctg?.name}>{ctg?.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="money">
                                Money
                            </label>
                            <input
                                id="money"
                                name="money"
                                type="number"
                                step="0.01"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={money}
                                onChange={(e) => setMoney(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                                Date
                            </label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
                                Time
                            </label>
                            <input
                                id="time"
                                name="time"
                                type="time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="notes">
                                Notes
                            </label>
                            <input
                                id="notes"
                                name="notes"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>



                        <div className="modal-action">
                            <label htmlFor="cost-modal" className="btn">Add Cost</label>
                        </div>
                    </form>



                </div>
            </div>




        </div>
    );
};

export default AddCost;