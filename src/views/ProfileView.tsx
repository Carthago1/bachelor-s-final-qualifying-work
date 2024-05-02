import React, { useEffect } from 'react';
import { Layout } from 'antd';
import AppHeader from './Layout/AppHeader';
import ProfileCard from '@/components/ProfileCard';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ProfileView() {
    const { authorized } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorized) {
            navigate('/login');
        }
    })

    return (
        <Layout>
            <AppHeader />
            <ProfileCard />
        </Layout>
    )
}
