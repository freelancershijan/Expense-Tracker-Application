import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../Context/AuthProvider';

const AddFundCategory = () => {
    const { categories } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [nameValue, setNameValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameValue.trim();
        const email = localStorage.getItem('userEmail');

        if (!name) {
            toast.error("Please enter a valid Category Name.");
            return;
        }

        const category = {
            name,
            value: 0,
            type: 'fund',
            user: email
        }
        if (categories.find(ctg => ctg.name === category.name)) {
            toast.error("Already Have a Category with your account Like this Name. Please Create a Different Name")
        }
        else {
            setIsLoading(true); 
            fetch(`${process.env.REACT_APP_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(category)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('COngratulation!! Category Added');
                        window.location.href = '/fund-category';
                    }
                    else {
                        toast.error(data.message)
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    };

    return (
        <div>

            <input type="checkbox" id="category-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">

                    <label htmlFor="category-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <form onSubmit={handleSubmit}>
                        <h3 className='text-center text-3xl font-semibold mb-10'>Add Fund Category</h3>


                        <div className="mb-4">
                            <label className="block dark:text-white text-gray-700 font-bold mb-2" htmlFor="name">
                                Category Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="shadow dark:text-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Tution,Medical,Nasta etc"
                                required
                                value={nameValue}
                                onChange={handleNameChange}
                            />
                        </div>



                        <div className="modal-action">
                           <button type='submit' className="px-5 py-3 bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed text-white rounded-sm" disabled={isLoading || !nameValue.trim()}>
                                {isLoading ? <LoadingSpinner /> : 'Add Fund Category'}
                            </button>
                        </div>
                    </form>



                </div>
            </div>




        </div>
    );
};

export default AddFundCategory;