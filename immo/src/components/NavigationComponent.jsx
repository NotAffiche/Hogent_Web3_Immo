import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationComponent = () => {
    return (
        <>
        <header>
            <ul>
                <li>
                    <NavLink to='/' end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='panden' end>
                        Panden
                    </NavLink>
                </li>
                <li>
                    <NavLink to='favorieten' end>
                        Favorieten
                    </NavLink>
                </li>
            </ul>
        </header>
        </>
    );
};

export default NavigationComponent;