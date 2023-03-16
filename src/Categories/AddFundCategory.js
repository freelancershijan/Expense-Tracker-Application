import React from 'react';
import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

const AddFundCategory = () => {
    // const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;


        const categories = {
            name,
            value: 0,
            type: 'fund'
        }

        console.log(categories)



        fetch(' https://expense-tracker-application-server.vercel.app/categories', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(categories)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('COngratulation!! Category Added');
                    // refetch();
                    // navigate('/')
                    window.location.href = '/';
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(err => {
                console.log(err);
            })






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
                            />
                        </div>



                        <div className="modal-action">
                            <button htmlFor="category-modal" className="btn">Add Fund Category</button>
                        </div>
                    </form>



                </div>
            </div>




        </div>
    );
};

export default AddFundCategory;