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
    const { data: recentCostsTransactions, error, isLoading } = useGetUserRecentCostsTransactionsQuery({
        email: user?.email,
        page,
        limit,
        sort_by,
        sort_order
    }, {
        skip: !user?.email,
    });

    useEffect(() => {
        console.log('recent costs', recentCostsTransactions?.results?.data);
    }, [recentCostsTransactions])
    return (
        <div>
            <BaseTable>

            </BaseTable>
        </div>
    );
}