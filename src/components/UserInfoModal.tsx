import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { User } from '@/store/user/userTypes';
import { Modal, Form, Select, Input, Checkbox, message } from 'antd';
import { IGroup } from '@/views/AdminView';
import httpService from '@/services/httpService';

interface IUserInfoModalProps {
    modal: boolean,
    setModal: Dispatch<SetStateAction<boolean>>;
    setSelectedUser: Dispatch<SetStateAction<User | null>>;
    user: User | null;
    groups: IGroup[];
    setIsEdited: Dispatch<SetStateAction<boolean>>;
    isEdit: boolean;
}

export default function UserInfoModal({modal, setModal, user, setSelectedUser, groups, isEdit, setIsEdited}: IUserInfoModalProps) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [isStudent, setIsStudent] = useState<boolean | undefined>(false);
    const [isProfessor, setIsProfessor] = useState<boolean | undefined>(false);
    // const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
    const [groupId, setGroupId] = useState<string | undefined>('');
    const [userId, setUserId] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setSurname(user.surname);
            setPatronymic(user.patronymic);
            setEmail(user.email);
            setIsStudent(user.isStudent);
            setIsProfessor(user.isProfessor);
            // setIsAdmin(user.isAdmin);
            setUserId(user.id);
            const groupName = groups.find(g => g.id === user.groupID.at(0));
            setGroupId(groupName?.name);
        }
    }, [user]);

    const handleOk = async () => {
        const selectedGroupId = groups.find(g => g.name === groupId);
        
        const body = {
            first_name: name,
            last_name: surname,
            patronymic: patronymic,
            email: email,
            is_student: isStudent,
            is_teacher: isProfessor,
            id_group: selectedGroupId?.id,
        }

        if (selectedGroupId) {
            body.id_group = selectedGroupId?.id;
        }
        try {
            await httpService.put(`users/${userId}/`, body);
            setIsEdited(!isEdit);
            messageApi.open({
                type: 'success',
                content: 'Данные успешно обновлены'
            });
        } catch(error) {
            messageApi.open({
                type: 'error',
                content: 'Произошла ошибка, данные не обновлены'
            });
        }
        setModal(false);
        setSelectedUser(null);
    }

    const handleCancel = () => {
        setModal(false);
        setSelectedUser(null);
    }

    return (
        <>
            {contextHolder}
            <Modal
                title='Информация о пользователе'
                open={modal}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 700 }}
                >
                    <Form.Item label="Фамилия">
                        <Input value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Имя">
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Отчество">
                        <Input value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Группа">
                        <Select value={groupId} onChange={e => setGroupId(e)} >
                            {groups.map(group => (
                                <Select.Option key={group.id} value={group.name}>
                                    {group.name}
                                </Select.Option>))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label="Студент">
                        <Checkbox checked={isStudent} onChange={e => setIsStudent(e.target.checked)} />
                    </Form.Item>

                    <Form.Item label="Преподаватель">
                        <Checkbox checked={isProfessor} onChange={e => setIsProfessor(e.target.checked)} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
