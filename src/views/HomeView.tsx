import React, { useEffect } from 'react';
import AppLayout from './Layout/AppLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';

export default function HomeView() {
    const { authorized } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorized) {
            navigate('/login');
        }
    });

    return (
        <AppLayout />
    )
}