import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { setSelectedDiscipline } from '@/store/discipline/disciplineSlice';
import AddVideo from '@/components/AddVideo';

type MenuItem = Required<MenuProps>['items'][number];

const siderStyle: React.CSSProperties = {
    padding: '1rem',
    color: '#fff',
    // backgroundColor: '#1677ff',
};

export default function AppSider() {
    const disciplines = useSelector((state: RootState) => state.discipline);
    const { user } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const items: MenuItem[] = disciplines.discipline.map(d => {
        return {
            key: d.id,
            label: d.name,
        }
    });
    
    const defaultSelectedKeys = disciplines.selectedDiscipline !== null ? [disciplines.selectedDiscipline.toString()] : [];

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {user?.isProfessor &&
                <>
                <Button 
                    type='primary' 
                    style={{width: '100%', marginBottom: '1rem'}}
                    onClick={() => setOpen(true)}
                >
                    Добавить видео
                </Button>
                <AddVideo open={open} setOpen={setOpen} />
                </>
            }
            <Menu
                defaultSelectedKeys={defaultSelectedKeys}
                mode="inline"
                theme="dark"
                items={items}
                onClick={(info) => {
                    dispatch(setSelectedDiscipline(+info.key))
                    
                }}
            />
        </Layout.Sider>
    )
}
