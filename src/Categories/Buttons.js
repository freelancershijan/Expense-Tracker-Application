import React from 'react';
import { Link } from 'react-router-dom';
import AddCategory from './AddCategory';
import AddCost from './AddCost';
import AddFund from './AddFund';

const Buttons = () => {
    return (
        <div>
            <div className='text-center'>
                <div className="btn-group border-0 mb-10">
                    <button className="btn bg-green-700 hover:bg-green-900">
                        <label htmlFor="fund-modal" >Add Fund</label>
                    </button>
                    <button className="btn bg-red-700 hover:bg-red-600">
                        <label htmlFor="cost-modal" >Add Cost</label>
                    </button>
                    <button className="btn bg-zinc-900">
                        <label htmlFor="category-modal" >Add Category</label>
                    </button>
                    <Link to='/delete-category'>
                        <button className="btn bg-red-700">
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