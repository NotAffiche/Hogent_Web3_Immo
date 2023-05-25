import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './NavigationComponent';

const RootLayout = () => {
    return (
        <>
    <Navigation />
    <main>
        <Outlet />
    </main>
    </>
    );
};

export default RootLayout;