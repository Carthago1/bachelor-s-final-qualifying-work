import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import getInitialsFullName from '@/utils/getInitialsFullName';
import localStorageService from '@/services/localStorageService';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/user/userSlice';
import { resetDiscipline } from '@/store/discipline/disciplineSlice';

export default function HeaderRight() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        localStorageService.remove('Authorization');
        dispatch(clearUser());
        dispatch(resetDiscipline());
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
                <div onClick={logout}>Выйти</div>
            ),
        }
    ]
    
    return (
        <div>
            {user?.isAdmin && 
                <Button style={{marginRight: 10}} onClick={() => navigate('/admin')}>
                    Панель Администратора
                </Button>
            }
            <Dropdown menu={{items}} placement='bottomRight'>
                <Button>
                    {user && getInitialsFullName(user.name, user.surname, user.patronymic)}
                </Button>
            </Dropdown>
        </div>
    )
}
