import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider';

// 

const AddFund = () => {
    const { fundCategories, categories, user } = useContext(AuthContext);
    console.log('categories', categories);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission

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


        console.log(fundDetails);


        fetch('https://expense-tracker-application-server.vercel.app/funds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fundDetails)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('Congratulation!! Added Your Funds');
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(err => {
                console.log(err);
            })


        // update price




        const prevCategories = categories.find(ctg => ctg.name == fundDetails.category)


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

    // update price value


    // ekhan theje sob data gulake ekta new collection post kore stored korbo..and sudhu price take category collection er ager value er sathe put kore update korbo.




    return (



        <div>

            <input type="checkbox" id="fund-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <label htmlFor="fund-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

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
                            /* value={category}
                            onChange={(e) => setCategory(e.target.value)} */
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
                            /*  value={money}
                             onChange={(e) => setMoney(e.target.value)} */
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="date">
                                Date
                            </label>
                            <input
                                // required
                                id="date"
                                name="date"
                                type="date"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                            /*  value={date}
                             onChange={(e) => setDate(e.target.value)} */
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="time">
                                Time
                            </label>
                            <input
                                // required
                                id="time"
                                name="time"
                                type="time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                            /*  value={time}
                             onChange={(e) => setTime(e.target.value)} */
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="notes">
                                Notes
                            </label>
                            <input
                                // required
                                id="notes"
                                name="notes"
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                            /* value={notes}
                            onChange={(e) => setNotes(e.target.value)} */
                            />
                        </div>



                        <div className="modal-action">
                            <button type='submit' htmlFor="fund-modal" className="btn">Add Fund</button>
                        </div>
                    </form>




                    {/* <div className="modal-action">
                        <label htmlFor="fund-modal" className="btn">Yay!</label>
                    </div> */}
                </div>
            </div>




        </div>
    );
};

export default AddFund;