import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { useGetUserSingleFundCategoryDataListsQuery } from "../features/funds/fundsAPI";
import BaseTableList from './../Components/table/BaseTableList';
import FundCategoryTableRowItem from "./FundCategoryTableRowItem";

export default function FundCategory() {
    const user = useContext(AuthContext);
    const { page, limit, search, sort_by, sort_order } = useSelector((state) => state.filters);
    const { category } = useParams()

    const { data: lists, isLoading, isError, error } = useGetUserSingleFundCategoryDataListsQuery({
        email: user?.email,
        category,
        page,
        limit,
        sort_by,
        sort_order,
        search
    })

    const columns = [
        {
            name: 'Date',
            sort_by: 'date',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Category',
            sort_by: 'category',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Amount',
            sort_by: 'money',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Note',
            sort_by: 'notes',
            sort_order: '',
            isSort: true,
        },
        {
            name: 'Time',
            sort_by: 'time',
            sort_order: '',
            isSort: true,
        }
    ]

    return (
        <div className='mx-2 md:m-10'>
            <BaseTableList
                columns={columns}
                values={lists?.results?.data?.map(item => (
                    <FundCategoryTableRowItem
                        key={item._id} // Ensure each row has a unique key
                        rowData={item}
                    />
                ))}
                total={lists?.results?.totalAmount}
                isLoading={isLoading}
                error={error}
                isError={isError}
                isShowDelete={true}
                isShowSearch={true}
            />
        </div>
    );
}