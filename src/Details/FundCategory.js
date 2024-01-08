import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const FundCategory = () => {
    const fundsCategories = useLoaderData([]);
    const { categories,email } = useContext(AuthContext);

    const filtr = fundsCategories.filter(ctg => ctg?.user === email)
    let fndctgoris = fundsCategories.map(fctg => fctg?.category);
    let ctgoris = categories.filter(ctg => ctg?.name === fndctgoris[0])

    // delete single fund
    const handleDelete = fnd => {
        fetch(`${process.env.REACT_APP_API_URL}/funds/${fnd._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Fund Deleted Successfully');
                    const price = fnd?.money
                    const updateValue = {
                        value: ctgoris[0].value - price
                    }
                    fetch(`${process.env.REACT_APP_API_URL}/categories/${fnd?.category}/${email}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updateValue)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success("Price Updated Successfully");
                            window.location.href = '/';
                            console.log(data.message); 
                        })
                        .catch(err => console.error(err));
                }
            })
    }


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const priceBodyTemplate = (product) => {
        return formatCurrency(product.money);
    };

    const indexBodyTemplate = (fund, index) => {
        console.log('fund', index.rowIndex)
        return index.rowIndex + 1
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition duration-500 ease-in-out" onClick={() => handleDelete(rowData)} />
            </React.Fragment>
        );
    };



    return (
        <div className='sm:m-10 m-6'>
            <Link to='/fund-category'>
                <button className='px-5 py-2 text-white bg-primary rounded-sm mb-5'>Back</button>
            </Link>
 



               <DataTable value={filtr} paginator={filtr.length > 10 ? true : false} rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Funds">
                   <Column header="SL" body={indexBodyTemplate}></Column>
                   <Column field="category" header="Category"></Column>
                   <Column field="money" header="Amount" body={priceBodyTemplate} sortable></Column>
                   <Column field="date" header="Date" sortable></Column>
                   <Column field="time" header="Time" sortable></Column>
                   <Column field="notes" header="Notes" sortable></Column>
                   <Column body={actionBodyTemplate} exportable={false} header="Action" ></Column>
                
                </DataTable>
        </div>
    );
};

export default FundCategory;