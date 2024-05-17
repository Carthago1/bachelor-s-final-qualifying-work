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
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await httpService.get<any>('whoami');
                
                dispatch(setUser({
                    id: data.id,
                    name: data.first_name,
                    surname: data.last_name,
                    patronymic: data.patronymic,
                    email: data.email,
                    isAdmin: data.is_admin,
                    isStudent: data.is_student,
                    isProfessor: data.is_teacher, 
                }));

                const response = await httpService.get(`disciplines/?id_student=${data.id}`);
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        // const fetchDisciplines = async () => {
        //     try {
        //         // const response = await()
        //         dispatch(setDiscipline([
        //             {
        //                 id: 1,
        //                 name: 'Алгебра',
        //             },
        //             {
        //                 id: 2,
        //                 name: 'Физика',
        //             }, 
        //             {
        //                 id: 10,
        //                 name: 'Геометрия'
        //             }
        //         ]));
        //     } catch (error) {
        //         console.log(error);
        //     } finally {
        //         setLoading(false);
        //     }
        // }

        const token = localStorageService.get('Authorization');
        if (token) {
            fetchUser();
            // fetchDisciplines();
        }
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
                <Route path='/registration' element={<RegistrationView />} />
                <Route path='/video/:videoId' element={<VideoView />} />
                <Route path='*' element={<NotFoundView />} />
            </Routes>
        </Router>
    )
}

export default MainView;
