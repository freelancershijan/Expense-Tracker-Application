import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';
import loginImg from '../../../images/login.png'

const Login = () => {

    const [error, setError] = useState('');
    const { signInGoogle, setLoading, signIn } = useContext(AuthContext)


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                localStorage.setItem("userEmail", user?.email);
                form.reset();
                setError('');
                window.location.href = '/';
            })
            .catch(error => {
                console.error('SIgn In from From User', error)
                setError(error.message);
                setLoading(false);
            })
    }
    const handleGoogleSignIn = () => {
        signInGoogle()
            .then(result => {
                const user = result.user;
                localStorage.setItem("userEmail", user?.email);
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Google User SIgn In error', error);
                toast.error(error.message)
            })
    }

    return (



        <section className="bg-background">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-20 py-20 items-center">
                
                    <div className="w-full">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black">Sign in to Continue</h2>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">Don’t have an account? <Link to='/register' title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</Link></p>

                        <form onSubmit={handleSubmit} method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                                    <div className="mt-2.5">
                                        <input

                                            required
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter email to get started"
                                            className="block w-full md:p-4 p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-primary focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>

                                        <Link to='/reset-password' className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"> Forgot password? </Link>
                                    </div>
                                    <div className="mt-2.5">
                                        <input
                                            type="password"
                                            required
                                            name="password"
                                            id="password"
                                            placeholder="Enter your password"
                                            className="block w-full md:p-4 p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-white focus:outline-none focus:border-primary focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className='text-red-600'>
                                    {error}
                                </div>

                                <div>
                                    <button type="submit" className="inline-flex items-center justify-center w-full p-3 md:p-4 text-base font-semibold text-white bg-primary border border-transparent rounded-md focus:outline-none hover:bg-primary/90 focus:bg-primary transition duration-500 ease-in-out">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-3 space-y-3">
                            <button
                                onClick={handleGoogleSignIn}
                                type="button"
                                className="relative inline-flex items-center justify-center w-full p-3 md:p-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                            >
                                <div className="absolute inset-y-0 left-0 p-4">
                                    <FaGoogle className='w-6 h-6'></FaGoogle>
                                </div>
                                Sign in with Google
                            </button>


                        </div>
                    </div>
            

                    <div>
                    <div className='w-[80%] mx-auto'>
                    <img className="w-full h-full" src={loginImg} alt="" />
                        </div>

                        <div className="w-full max-w-md mx-auto xl:max-w-xl">
                            <h3 className="text-xl md:text-2xl mt-5 font-bold text-center text-black">Calculate Your Daily Funds and Costs</h3>
                            <p className="leading-relaxed text-center text-gray-500 mt-2.5">If you want to be a successful man then you need to more hardwork.</p>


                        </div>
                    </div>
        
            </div>
        </section>




    );
};

export default Login;