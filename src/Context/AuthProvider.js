import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(' https://expense-tracker-application-server.vercel.app/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])



    const authInfo = {
        categories


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