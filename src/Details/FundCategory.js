import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { useGetUserCategoryFundListsQuery } from "../features/funds/fundsAPI";

export default function FundCategory(){
    const {user} = useContext(AuthContext);
    const { category } = useParams();
    const { page, limit,sort_by, search, sort_order } = useSelector((state) => state.filters);

    const {data: lists, isLoading, isError, error} = useGetUserCategoryFundListsQuery({
        email: user?.email,
        category,
        page,
        limit,
        sort_by,
        sort_order,
        search
    })
    
    return (
        <>
        
        </>
    );
}