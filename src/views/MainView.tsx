import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/user/userSlice';
import { setDiscipline } from '@/store/discipline/disciplineSlice';
import { Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import localStorageService from '@/services/localStorageService';

import LoginFormView from './LoginFormView';
import ProfileView from './ProfileView';
import HomeView from './HomeView';
import NotFoundView from './NotFoundView';

function MainView() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorageService.get('Authorization');
        if (token) {
            // ЗАПРОС
            dispatch(setUser({
                id: 1,
                name: 'Дмитрий',
                surname: 'Верин',
                patronymic: 'Сергеевич',
                email: 'dima.verin.2002@mail.ru'
            }));
            // ЗАПРОС
            dispatch(setDiscipline([
                {
                    id: 1,
                    name: 'Алгебра',
                },
                {
                    id: 2,
                    name: 'Физика',
                }, 
                {
                    id: 10,
                    name: 'Геометрия'
                }
            ]));
        }

        setIsLoggedIn(() => {
            setLoading(false);
            return !!token;
        });
    }, [dispatch]);

    if (loading) {
        return <Spin fullscreen/>;
    }

    return (
        <Router>
            {!isLoggedIn && <Navigate to="/login" />}
            <Routes>
                <Route path='/login' element={<LoginFormView />} />
                <Route path='/' element={<HomeView />} />
                <Route path='/profile' element={<ProfileView />} />
                <Route path='*' element={<NotFoundView />} />
            </Routes>
        </Router>
    )
}

export default MainView;