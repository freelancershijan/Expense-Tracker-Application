import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const email = localStorage.getItem('userEmail');

    // login and registration functionality
    const googleProvider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('greenTechToken')
        return signOut(auth);
    }

    const verifyEmail = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }

    const passResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    // ************************************************ //


    // Get user Details

/*     const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/user-details?user=${ email }`);
                setUserDetails(result?.data?.result);
            } catch (error) {
                console.error('Error fetching user details: ', error);
            }
        };

        fetchUserDetails();
    }, [email]) */


    const authInfo = {
        createUser,
        signInGoogle,
        user,
        signIn,
        logOut,
        updateUserProfile,
        loading,
        setLoading,
        passResetEmail,
        verifyEmail,
        email,
        // userDetails

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