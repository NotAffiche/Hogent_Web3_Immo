import React from 'react';
import immoLogo from '../assets/images/immo_logo.png';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        <img src={immoLogo} alt="IMMO Logo" className="max-w-full" />
        <section className="ml-4">
          <article>
            <h2 className="text-2xl font-bold">Welkom bij IMMO-Web3</h2>
            <p className="text-lg">Als je een pand wil kopen/huren ben je op de juiste plaats!</p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default HomePage;