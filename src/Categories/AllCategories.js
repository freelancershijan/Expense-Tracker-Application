import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Buttons from './Buttons';

const AllCategories = () => {
    const { categories } = useContext(AuthContext);
    return (
        <div>
            <div className="divider my-20 text-3xl font-semibold">Categories</div>

            <Buttons />

            {
                categories.length === 0 ?

                    <div className='bg-gray-400 py-10 px-5'>
                        <h3 className='text-xl font-semibold'>You have not created any category. Please make <span className='text-green-800'>fund</span> on <span className='text-red-700'>cost</span> category before then you can add your funds and costs</h3>
                    </div>

                    : <div className='md:grid mb-40 md:grid-cols-2 lg:grid-cols-4 gap-5'>

                        {
                            categories.map(ctg => <div key={ctg?._id} className={`card my-5 md:my-0 ${ctg?.type === 'fund' ? 'bg-green-700' : 'bg-red-700'} text-neutral-content`}>
                                <Link to={`/${ctg?.type}/${ctg?.name}`}>
                                    <div className="card-body items-center text-center">
                                        <h3 className="card-title">{ctg?.name}</h3>
                                        <h1 className='text-3xl font-semibold'>${ctg?.value}</h1>

                                    </div>
                                </Link>
                            </div>)
                        }

                    </div>
            }

        </div>
    );
};

export default AllCategories;