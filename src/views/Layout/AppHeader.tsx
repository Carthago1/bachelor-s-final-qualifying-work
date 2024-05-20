import React from 'react';
import { Layout } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HeaderRight from '@/components/HeaderRight';

const headerStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    height: 60,
    padding: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    // backgroundColor: '#4096ff',
    // backgroundColor: 'white',
};

export default function AppHeader() {
    return (
        <Layout.Header style={headerStyle}>
            <span style={{ color: '#fff' }}>
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
                    <div style={{display: 'flex', gap: 10, whiteSpace: 'nowrap'}}>
                        <VideoCameraOutlined />
                        <span style={{overflow: 'hidden'}}>На главную</span>
                    </div>
                </Link>
            </span>
            <HeaderRight />
        </Layout.Header>
    )
}
