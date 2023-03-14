import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import Buttons from './Buttons';

const AllCategories = () => {
    const { categories } = useContext(AuthContext);
    // console.log(categories);
    return (
        <div>
            <div className="divider my-20 text-3xl font-semibold">Categories</div>

            <Buttons />

            <div className='md:grid mb-40 md:grid-cols-2 lg:grid-cols-4 gap-5'>

                {
                    categories.map(ctg => <div key={ctg?._id} className="card my-5 md:my-0 bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h3 className="card-title">{ctg?.name}</h3>
                            <h1 className='text-3xl font-semibold'>${ctg?.value}</h1>

                        </div>
                    </div>)
                }

            </div>
        </div>
    );
};

export default AllCategories;