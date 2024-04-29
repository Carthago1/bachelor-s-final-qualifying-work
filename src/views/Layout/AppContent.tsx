import React from 'react';
import { Layout } from 'antd';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#0958d9',
    padding: '1rem',
};

export default function AppContent() {
    const discipline = useSelector((state: RootState) => state.discipline);

    return (
        <Layout.Content style={contentStyle}>
            {discipline.discipline.find((d) => d.id === discipline.selectedDiscipline)?.name}
        </Layout.Content>
    )
}
