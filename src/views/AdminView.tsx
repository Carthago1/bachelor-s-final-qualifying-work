import React, { useEffect, useState } from 'react';
import { Layout, Input, Button } from 'antd';
import { RootState } from '@/store/store';
import { User } from '@/store/user/userTypes';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppHeader from './Layout/AppHeader';
import UserList from '@/components/UserList';
import httpService from '@/services/httpService';
import RequestCard from '@/components/RequestCard';

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

interface Fio {
    first_name: string;
    last_name: string;
    patronymic: string;
}

export type IRequestStatuses = 'Pending' | 'Done' | 'Denied' | 'Deleted';

export interface ISupportRequest {
    id: number;
    fio: Fio;
    title: string;
    content: string;
    status: IRequestStatuses;
    id_user: number;
    creation_date: string;
}

export default function AdminView() {
    const { user } = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [groups, setGroups] = useState<IGroup[]>([]);
    const [search, setSearch] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [activeRequests, setActiveRequests] = useState<ISupportRequest[]>([]);
    const [requests, setRequests] = useState<ISupportRequest[]>([]);
    const [isStudentList, setIsStudentList] = useState(true);
    const [isActiveRequestList, setIsActiveRequestList] = useState(false);

    function onUpdateStatus(requestId: number, newStatus: IRequestStatuses) {
        const indexToUpdate = requests.findIndex(req => req.id === requestId)
        const updatedRequests = [...requests];
        updatedRequests[indexToUpdate].status = newStatus;
        setRequests(updatedRequests);
        setActiveRequests(() => {
            if (isActiveRequestList && activeRequests.length === 1) {
                handleHistoryRequestClick();
            }
            return [...activeRequests.filter(req => req.id !== requestId)]
        });
    }

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

                const responseRequests = await httpService.get<ISupportRequest[]>('requests');
                setRequests(responseRequests);
                const activeRequestsFiltered = responseRequests.filter(req => req.status === 'Pending');
                setActiveRequests(activeRequestsFiltered);
            } catch(error) {
                console.log(error);
            }
        }

        fetchUsersData();
    }, [isEdited]);

    function handleUsersListClick() {
        setIsStudentList(true);
        setIsActiveRequestList(false);
    }

    function handleHistoryRequestClick() {
        setIsStudentList(false);
        setIsActiveRequestList(false);
    }

    function handleActiveRequestsClick() {
        setIsStudentList(false);
        setIsActiveRequestList(true);
    }

    return (
        <Layout>
            <AppHeader />
            <Layout.Content style={contentStyle}>
                <div style={containerStyle}>
                    <div style={{display: 'flex', justifyContent: 'end', width: '100%', gap: 10, flexWrap: 'wrap'}}>
                        <Button type='default' onClick={handleUsersListClick}>Список студентов</Button>
                        <Button type='default' onClick={handleHistoryRequestClick}>История обращений</Button>
                        {activeRequests.length > 0 && 
                            <Button type='primary' onClick={handleActiveRequestsClick}>Обращения {activeRequests.length}</Button>
                        }
                    </div>
                    {isStudentList ?
                        <>
                            <Input.Search 
                                placeholder='Введите фамилию студента'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onSearch={processSearch}
                            />
                            <UserList users={users} groups={groups} isEdit={isEdited} setIsEdited={setIsEdited}/>
                        </> :
                        <div style={{display: 'flex', gap: 10, flexDirection: 'column'}}>
                            {isActiveRequestList ? 
                                activeRequests.map(req => (
                                    <RequestCard key={req.id} request={req} onUpdateStatus={onUpdateStatus} />
                                )) : 
                                requests.map(req => (
                                    <RequestCard key={req.id} request={req} onUpdateStatus={onUpdateStatus} />
                                ))
                            }
                        </div>
                    }
                </div>
            </Layout.Content>
        </Layout>
    )
}
