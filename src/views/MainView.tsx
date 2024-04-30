import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/user/userSlice';
import { setDiscipline } from '@/store/discipline/disciplineSlice';
import { Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import localStorageService from '@/services/localStorageService';
import httpService from '@/services/httpService';

import LoginFormView from './LoginFormView';
import ProfileView from './ProfileView';
import HomeView from './HomeView';
import NotFoundView from './NotFoundView';
import RegistrationView from './RegistrationView';
import VideoView from './VideoView';

function MainView() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchUser = async () => {
        //     const data = await httpService.get<any>('whoami/');
        //     console.log(data);
        // }
        const token = localStorageService.get('Authorization');
        if (token) {
            // ЗАПРОС
            // fetchUser();
            dispatch(setUser({
                id: 1,
                name: 'Дмитрий',
                surname: 'Верин',
                patronymic: 'Сергеевич',
                email: 'dima.verin.2002@mail.ru',
                isStudent: true,
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
            <Routes>
                <Route path='/login' element={<LoginFormView />} />
                <Route path='/' element={<HomeView />} />
                <Route path='/profile' element={<ProfileView />} />
                <Route path='/regestration' element={<RegistrationView />} />
                <Route path='/video/:videoId' element={<VideoView />} />
                <Route path='*' element={<NotFoundView />} />
            </Routes>
        </Router>
    )
}

export default MainView;
