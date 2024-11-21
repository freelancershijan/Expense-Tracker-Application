import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BaseSelectBox from '../Components/common/BaseSelectBox';
import BaseInput from '../Components/inputs/BaseInput';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';
import { useGetUserFundCategoriesQuery } from '../features/funds/fundsAPI';


const AddFund = () => {
    const { user } = useContext(AuthContext);
    const { search } = useSelector((state) => state.filters);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [showNotesError, setShowNotesError] = useState(false);

    const { data, isLoading, isError, error } = useGetUserFundCategoriesQuery({
        email: user?.email,
        search
    });

    const { data: fundCategories } = data?.results || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (notes === '') {
            setShowNotesError(true);
            return;
          } else {
            setShowNotesError(false);
          }

          console.log("showNotesError", showNotesError);
          

        const fundDetails = {
            category,
            money: amount,
            date,
            time,
            notes,
            user: user?.email
        }

        console.log('fundDetails', fundDetails);

    };
    return (
        <div>
            {
                fundCategories?.length === 0 ? <div className='h-[100vh] px-6 flex items-center justify-center'>
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

                                <BaseSelectBox lists={fundCategories} isLoading={isLoading} isError={isError} error={error} category={category} setCategory={setCategory} />
                            </div>
                            <div className="mb-4">
                                <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="money">
                                    Money
                                </label>
                                <input
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    placeholder='Enter Amount'
                                    className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="date">
                                    Date
                                </label>
                                <input
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
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
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    type="time"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="mb-4">
                                <BaseInput
                                    label="Notes"
                                    required={true}
                                    value={notes}
                                    setValue={setNotes}
                                    showError={showNotesError}
                                    placeholder="Notes"
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