import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Commons/Header/Header';
import Footer from '../Components/Commons/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Header />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default Main;