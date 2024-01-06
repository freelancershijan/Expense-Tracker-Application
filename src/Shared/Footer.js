import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className=" bg-primary">
    <div className="max-w-7xl px-6 mx-auto py-5 text-white">
              <p className="sm:text-base text-xs text-gray-200 hover:text-white text-center">© Copyright <span>{ currentYear } </span>
        Expense Tracking Software. | All Rights Reserved | Developed by <a href="https://www.linkedin.com/in/mdshijanali" rel='noreferrer' target="_blank"
          className="hover:text-primary font-semibold">Md Shijan Ali.</a></p>
    </div>
  </div>
  );
};

export default Footer;