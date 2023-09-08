import React from 'react';

const Header = () => {
  return (
    <header className=" bg-blue-500 bg-opacity-20 backdrop-blur-md py-4 sm:py-6 lg:py-6">
      <div className="container text-center mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white text-center font-semibold">
        MeWeather
        </h1>
        
      </div>
    </header>
  );
};

export default Header;