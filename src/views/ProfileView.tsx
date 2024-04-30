import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Layout/AppHeader';
import ProfileCard from '@/components/ProfileCard';

export default function ProfileView() {
    return (
        <Layout>
            <AppHeader />
            <ProfileCard />
        </Layout>
    )
}
