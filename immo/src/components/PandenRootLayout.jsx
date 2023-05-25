import React from 'react';
import { Outlet } from 'react-router-dom';

const PandenRootLayout = () => {
    return (
        <>
        <main>
            <Outlet />
        </main>
        </>
    );
};

export default PandenRootLayout;