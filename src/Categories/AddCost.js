import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';

// 

const AddCost = () => {

    const { costCategories, categories, user } = useContext(AuthContext);


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

        // console.log(costDetails);


        fetch('https://expense-tracker-application-server.vercel.app/costs', {
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


        const prevCategories = categories.find(ctg => ctg.name == costDetails.category)


        const prevValue = prevCategories.value;



        const prevName = prevCategories.name;

        console.log(prevName);



        const updateValue = {
            value: (prevValue + money),
        }

        console.log(updateValue);




        const email = localStorage.getItem('userEmail');


        fetch(`https://expense-tracker-application-server.vercel.app/categories/${prevName}/${email}`, {
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






    };
    return (



        <div>


            <div className="">
                <div className="modal-box mx-auto">

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
                            <button type='submit' htmlFor="cost-modal" className="btn">Add Cost</button>
                        </div>
                    </form>



                </div>
            </div>




        </div>
    );
};

export default AddCost;