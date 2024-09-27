import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useGetUserRecentCostsTransactionsQuery } from "../features/costs/costsAPI";
import BaseTable from "./table/BaseTable";

export default function Recent() {
    const { user } = useContext(AuthContext);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort_by, setSortBy] = useState('_id');
    const [sort_order, setSortOrder] = useState('desc');
    // Check if user email is available before making the query
    const { data: recentCostsTransactions, isError, isLoading } = useGetUserRecentCostsTransactionsQuery({
        email: user?.email,
        page,
        limit,
        sort_by,
        sort_order
    }, {
        skip: !user?.email,
    });

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

    useEffect(() => {
        console.log('recent costs', recentCostsTransactions?.results?.data);
    }, [recentCostsTransactions])
    return (
        <div>
            <BaseTable
             columns={columns}
             values={recentCostsTransactions?.results?.data}
             isLoading={isLoading}
             isError={isError}
            >

            </BaseTable>
        </div>
    );
}