import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Recent = () => {
    const { recent, recentCost } = useContext(AuthContext);

    console.log(recent)

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.money);
    };

    return (
        <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
            <div className='col-span-1'>
                <h1 className='text-xl text-black font-semibold mb-5'>Recent Added Funds</h1>

                <DataTable value={recent.slice(0,5)}>
                   <Column field="category" header="Category" sortable></Column>
                   <Column field="money" header="Amount" body={priceBodyTemplate} sortable></Column>
                   <Column field="date" header="Date" sortable></Column>
                   <Column field="time" header="Time" sortable></Column>
                </DataTable>
            </div>

            <div className='col-span-1'>
                <h1 className='text-xl text-black font-semibold mb-5'>Recent Added Costs</h1>

                <DataTable value={recentCost.slice(0,5)}>
                   <Column field="category" header="Category" sortable></Column>
                   <Column field="money" header="Amount" body={priceBodyTemplate} sortable></Column>
                   <Column field="date" header="Date" sortable></Column>
                   <Column field="time" header="Time" sortable></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Recent;