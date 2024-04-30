import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function RegistrationView() {
    const navigate = useNavigate();
    const { authorized } = useSelector((state: RootState) => state.user);
    
    useEffect(() => {
        if (authorized) {
            navigate('/');
        }
    })
    
    return (
        <h1>Страница регистрации</h1>
    )
}
