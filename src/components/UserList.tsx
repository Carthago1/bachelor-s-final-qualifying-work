import React, { useState, Dispatch, SetStateAction } from 'react';
import { User } from '@/store/user/userTypes';
import { List } from 'antd';
import UserInfoModal from './UserInfoModal';
import { IGroup } from '@/views/AdminView';

interface IUserListProps {
    users: User[];
    groups: IGroup[];
    setIsEdited: Dispatch<SetStateAction<boolean>>;
    isEdit: boolean;
}

export default function UserList({ users, groups, setIsEdited, isEdit }: IUserListProps) {
    const [modal, setModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleItemClick = (user: User) => {
        setSelectedUser(user);
        setModal(true);
    }
    
    return (
        <>
            <List
                style={{width: '100%'}}
                size="large"
                bordered
                dataSource={users}
                renderItem={(user) => (
                    <List.Item style={{cursor: 'pointer'}} onClick={() => handleItemClick(user)}>
                        {`${user.surname} ${user.name} ${user.patronymic && user.patronymic}`}
                    </List.Item>)}
            />

            <UserInfoModal 
                modal={modal} 
                setModal={setModal} 
                user={selectedUser} 
                setSelectedUser={setSelectedUser}
                groups={groups}
                isEdit={isEdit}
                setIsEdited={setIsEdited}
            />
        </>
    )
}
