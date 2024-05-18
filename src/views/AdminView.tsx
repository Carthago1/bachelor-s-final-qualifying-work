import React, { useEffect, useState } from 'react';
import { Layout, Input } from 'antd';
import { RootState } from '@/store/store';
import { User } from '@/store/user/userTypes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppHeader from './Layout/AppHeader';
import UserList from '@/components/UserList';
import httpService from '@/services/httpService';

const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding: '1rem',
};

const containerStyle: React.CSSProperties = {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
}

export interface IGroup {
    id: number;
    name: string;
}

export default function AdminView() {
    const { user } = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [search, setSearch] = useState('');
    const [isEdited, setIsEdited] = useState(false);

    async function processSearch() {
        try {
            const response = await httpService.get<any[]>(`users/?lastname=${search}`);

            const usersList: User[] = response.map(u => {
                return {
                    id: u.id,
                    name: u.first_name,
                    surname: u.last_name,
                    patronymic: u.patronymic,
                    email: u.email,
                    isStudent: u.is_student,
                    groupID: u.id_group,
                    isProfessor: u.is_teacher,
                    isAdmin: u.is_admin,
                }
            });

            setUsers(usersList);
        } catch(error) {
            console.log(error);
        } finally {
            setSearch('');
        }
    }
    
    useEffect(() => {
        if (!user?.isAdmin) {
            navigate('/');
        }

        async function fetchUsersData() {
            try {
                const response = await httpService.get<any[]>('users/');
                const usersList: User[] = response.map(u => {
                    return {
                        id: u.id,
                        name: u.first_name,
                        surname: u.last_name,
                        patronymic: u.patronymic,
                        email: u.email,
                        isStudent: u.is_student,
                        groupID: u.id_group,
                        isProfessor: u.is_teacher,
                        isAdmin: u.is_admin,
                    }
                });

                setUsers(usersList);
                
                const groupsList = await httpService.get<IGroup[]>('groups/');
                setGroups(groupsList);
            } catch(error) {
                console.log(error);
            }
        }

        fetchUsersData();
    }, [isEdited]);

    return (
        <Layout>
            <AppHeader />
            <Layout.Content style={contentStyle}>
                <div style={containerStyle}>
                    <Input.Search 
                        placeholder='Введите фамилию студента'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onSearch={processSearch}
                    />
                    <UserList users={users} groups={groups} isEdit={isEdited} setIsEdited={setIsEdited}/>
                </div>
            </Layout.Content>
        </Layout>
    )
}
