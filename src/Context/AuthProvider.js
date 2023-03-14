import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(' https://expense-tracker-application-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const [funds, setFunds] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/costs')
            .then(res => res.json())
            .then(data => setFunds(data))
    }, [])


    const fundCategories = categories.filter(ctg => ctg?.type == 'fund');

    const costCategories = categories.filter(ctg => ctg?.type == 'cost');



    const authInfo = {
        categories,
        funds,
        fundCategories,
        costCategories


    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;