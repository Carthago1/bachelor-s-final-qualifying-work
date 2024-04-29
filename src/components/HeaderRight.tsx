import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import getInitialsFullName from '@/utils/getInitialsFullName';
import localStorageService from '@/services/localStorageService';


export default function HeaderRight() {
    const navigate = useNavigate();

    function logout() {
        localStorageService.remove('Authorization');
        navigate('/login', {replace: true});
        
    }

    const { user } = useSelector((state: RootState) => state.user);
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to='/profile'>Мой профиль</Link>
            ),
        },
        {
            key: '2',
            label: (
                <span onClick={logout}>Выйти</span>
            ),
        }
    ]
    
    return (
        <Dropdown menu={{items}} placement='bottomRight'>
            <Button>
                {user && getInitialsFullName(user.name, user.surname, user.patronymic)}
            </Button>
        </Dropdown>
    )
}