import React from 'react';
import { Link } from 'react-router-dom';
import AddCategory from './AddCategory';
import AddCost from './AddCost';
import AddFund from './AddFund';

const Buttons = () => {
    return (
        <div>
            <div className='text-center'>
                <div className="md:grid md:gap-2 gap-2 md:grid-cols-2 justify-center lg:grid-cols-4  border-0 mb-10">

                    <label className="btn my-1 md:my-0  bg-green-700 hover:bg-green-900 w-full" htmlFor="fund-modal" >Add Fund</label>


                    <label className="btn my-1 md:my-0  bg-red-700 hover:bg-red-600 w-full" htmlFor="cost-modal" >Add Cost</label>


                    <label className="btn my-1 md:my-0  bg-zinc-900 w-full" htmlFor="category-modal" >
                        Add Category</label>



                    <Link to='/delete-category'>
                        <button className="btn  my-1 md:my-0 w-full bg-red-700">
                            Delete Category
                        </button>
                    </Link>


                </div>
            </div>
            <AddFund></AddFund>
            <AddCost></AddCost>
            <AddCategory></AddCategory>

        </div>

    );
};

export default Buttons;