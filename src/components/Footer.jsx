import React from 'react';

const Footer = () => {
  return (
    <footer className=" bg-blue-500 mt-[190px] bg-opacity-20 backdrop-blur-md text-white py-4">
      <div className="container mx-auto  font-bold text-center">
        <p>&copy; {new Date().getFullYear()} MeWeather</p>
      </div>
    </footer>
  );
};

export default Footer;