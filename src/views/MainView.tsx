import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserState } from '@/store/user/userTypes';
import { RootState } from '@/store/store';
import localStorageService from '@/services/localStorageService';

import LoginFormView from './LoginFormView';
import AboutView from './AboutView';
import HomeView from './HomeView';

function MainView() {
    // const user = useSelector((state: RootState) => state.user);
    // console.log(user);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const token = localStorageService.get('Authorization');
        if (token) {
            // ЗАПРОС
        }

        setIsLoggedIn(() => {
            setLoading(false);
            return !!token;
        });
    }, []);

    if (loading) {
        return <Spin fullscreen/>;
    }

    return (
        <Router>
            {!isLoggedIn && <Navigate to="/login" />}
            <Routes>
                <Route path='/login' element={<LoginFormView />} />
                <Route path='/home' element={<HomeView />} />
                <Route path='/about' element={<AboutView />} />
            </Routes>
        </Router>
    )
}

export default MainView;
