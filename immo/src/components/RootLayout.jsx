import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './NavigationComponent';

const RootLayout = () => {
    return (
    <div>
    <Navigation />
    <main className="container mx-auto py-4">
        <Outlet />
    </main>
    </div>
    );
};

export default RootLayout;