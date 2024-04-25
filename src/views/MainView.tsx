import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '@/store/user/userTypes';
import { RootState } from '@/store/store';
import LoginFormView from '@/views/LoginFormView';
import localStorageService from '@/services/localStorageService';


function MainView() {
    // const user = useSelector((state: RootState) => state.user);
    // console.log(user);


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorageService.get('authToken');

        if (token) {
            console.log('authorized');
        } else {
            console.log('not authorized');  
        }

        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            {isLoggedIn ? (<h1>Authorized</h1>) : (<LoginFormView />) }
        </>
    )
}

export default MainView;
