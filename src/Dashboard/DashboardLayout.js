import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../images/Wordmark_DarkBlue.png';
import SidebarComponent from './SidebarComponent';

const DashboardLayout = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <div className='flex justify-between px-6 my-6 lg:hidden' >
             <div className='sm:w-40 w-32'>
                <img className='w-full' src={logo} alt="" />    
             </div>
             <Button icon="pi pi-align-justify text-xl" className='flex lg:hidden' onClick={() => setVisible(true)} />
            </div>
            <Sidebar visible={visible} onHide={() => setVisible(false)}  className='p-0 m-0'>      
                <SidebarComponent />  
            </Sidebar>
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-4">
            <div className='col-span-1 hidden lg:block'>
                <SidebarComponent />
                </div>
                <div className="bg-[#F2F2F2] xl:col-span-4 lg:col-span-3 col-span-4 p-5">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;