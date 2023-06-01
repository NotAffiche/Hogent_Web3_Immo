import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/immo_logo.png';

const NavigationComponent = () => {
    const navigate = useNavigate();

    return (
    <>
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <img src={logo} alt="Logo" className="w-20 h-20 rounded-full mb-2" onClick={() => navigate(`/`)} />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                end
                className="text-white hover:text-gray-300 px-2 py-1 rounded-md"
                activeClassName="bg-gray-700"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/panden"
                end
                className="text-white hover:text-gray-300 px-2 py-1 rounded-md"
                activeClassName="bg-gray-700"
              >
                Panden
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </>
    );
};

export default NavigationComponent;